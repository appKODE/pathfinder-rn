import type { PathfinderConfiguration } from './pathfinder-configuration';
import type {
  MethodObject,
  MockServerSettings,
  ResolveParams,
  ResolveResult,
  PathfinderSettings,
  Template,
} from './types';
import {
  compareUrlWithTemplate,
  createDomain,
  generatePath,
  getPathParameters,
  getQueryParams,
  Url,
} from './utils';

const defaultSettings: PathfinderSettings = {
  paths: {},
  servers: {},
};

export class Pathfinder {
  /**
   * Create new instance of Pathfinder
   * @param settings PathfinderConfiguration
   * @param initialSettings Settings
   */
  static create(
    config: PathfinderConfiguration,
    initialSettings: PathfinderSettings = defaultSettings
  ) {
    return new Pathfinder(config, initialSettings);
  }

  private config: PathfinderConfiguration;
  private settings: PathfinderSettings;
  private listeners: Record<
    string,
    (newSettings: Required<PathfinderSettings>) => void
  > = {};

  private constructor(
    config: PathfinderConfiguration,
    initialSettings: PathfinderSettings
  ) {
    this.config = config;
    this.settings = initialSettings;
  }

  /**
   * get original or changed url and headers
   */
  public resolve({ url, method, headers = {} }: ResolveParams): ResolveResult {
    const result = this.findTemplateAndScheme(url);
    if (!result) {
      return { url, headers };
    }

    const { template, scheme } = result;

    const settings = this.getSettings(template, method);

    if (!settings?.enabled) {
      return { url, headers };
    }

    const server =
      this.settings.servers[scheme.name] ||
      this.config.getMockServer(scheme.name);

    const resultUrl = this.buildUrl(url, template, settings, server);

    const resultHeaders = this.buildHeaders(headers, settings, server);

    return {
      url: resultUrl,
      headers: resultHeaders,
    };
  }

  public updateTemplateSettings(
    template: string,
    method: keyof Template,
    cb: (lastState: MethodObject) => MethodObject
  ) {
    this.prepareTemplateSettings(template, method);
    this.settings.paths[template][method] = cb(
      this.settings.paths[template][method]!
    );
    this.sendEvent('update_settings', { ...this.settings });
  }

  public updateMockServerSettings(
    specificationName: string,
    cb: (lastState: MockServerSettings) => MockServerSettings
  ) {
    this.settings.servers[specificationName] = cb(
      this.config.getMockServer(specificationName) || {
        domain: '',
        headers: {},
        queryParams: {},
      }
    );
    this.sendEvent('update_settings', { ...this.settings });
  }

  public addListener(
    event: 'update_settings',
    callback: (newSettings: PathfinderSettings) => void
  ) {
    this.listeners[event] = callback;
    return {
      remove: () => {
        delete this.listeners[event];
      },
    };
  }

  public getSchemas() {
    return this.config.getAll();
  }

  private sendEvent(event: 'update_settings', data: any) {
    if (this.listeners[event]) {
      this.listeners[event](data);
    }
  }

  public getSettings(path: string, method: keyof Template) {
    return this.settings.paths[path]?.[method];
  }

  private findTemplateAndScheme(url: string) {
    for (const scheme of this.getSchemas()) {
      const template = Object.keys(scheme.specification.paths).find(
        compareUrlWithTemplate(url)
      );
      if (template) {
        return { template, scheme };
      }
    }
    return null;
  }

  private prepareTemplateSettings(template: string, method: keyof Template) {
    if (!this.settings.paths[template]) {
      this.settings.paths[template] = {};
    }

    if (!this.settings.paths[template][method]) {
      this.settings.paths[template][method] = {
        enabledMock: false,
        enabled: false,
      };
    }
  }

  private buildUrl(
    url: string,
    template: string,
    settings: MethodObject,
    server?: MockServerSettings
  ): string {
    const { pathname, hostname, protocol, port, search } = new Url(url);
    let pathParameters = getPathParameters(pathname, template);
    let queryParameters = getQueryParams(search);

    let domain = createDomain(protocol, hostname, port);

    if (server && settings.enabledMock && this.canUseMockServer(server)) {
      queryParameters = {
        ...queryParameters,
        ...this.getQueryParamsMockServer(server),
      };
      domain = this.getDomainMockServer(server);
    }

    if (settings.parameters) {
      settings.parameters.forEach((parameter) => {
        switch (parameter.in) {
          case 'path':
            pathParameters[parameter.name] = parameter.value;
            break;
          case 'query':
            queryParameters[parameter.name] = parameter.value;
            break;
        }
      });
    }

    const path = generatePath(pathname, template, {
      pathParameters: pathParameters,
      queryParameters: queryParameters,
    });

    return `${domain}${path}`;
  }

  private buildHeaders(
    originalHeaders: Record<string, string>,
    settings: MethodObject,
    server: MockServerSettings
  ) {
    let headers = { ...originalHeaders };

    if (settings.enabledMock && this.canUseMockServer(server)) {
      headers = {
        ...headers,
        ...this.getHeadersMockServer(server),
      };
    }

    if (settings.parameters) {
      settings.parameters.forEach((parameter) => {
        if (parameter.in === 'header') {
          headers[parameter.name] = parameter.value;
        }
      });
    }

    return headers;
  }

  private canUseMockServer(server: MockServerSettings) {
    return Boolean(server && server.domain);
  }

  private getDomainMockServer(server: MockServerSettings) {
    return server.domain;
  }

  private getQueryParamsMockServer(server: MockServerSettings) {
    const queryParams: Record<string, string> = {};
    Object.entries(server.queryParams || {}).forEach(([key, value]) => {
      queryParams[key] = String(value);
    });
    return queryParams;
  }

  private getHeadersMockServer(server: MockServerSettings) {
    return server.headers || {};
  }
}
