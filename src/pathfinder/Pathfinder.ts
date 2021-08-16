import type {
  OpenAPIObject,
  OperationObject,
  ParameterObject,
} from './openApi/OpenApi';
import {
  compareUrlWithTemplate,
  createDomain,
  generatePath,
  getPathParameters,
  getQueryParams,
  URL,
} from './utils';

type MethodObject = Pick<OperationObject, 'requestBody'> & {
  parameters?: ParameterObject[];
  enabledMock: boolean;
  enabled: boolean;
};

type Template = {
  get?: MethodObject;
  put?: MethodObject;
  post?: MethodObject;
  delete?: MethodObject;
};

export type TMockServerSettings = {
  domain: string;
  headers: Record<string, string>;
  queryParams: Record<string, string | number | boolean>;
};

export type TPathfinderSettings = {
  environment?: string;
  mockServer?: Record<string, TMockServerSettings>;
  paths: Record<string, Template>;
};

type TResolveParams = {
  url: string;
  method: keyof Template;
  headers?: Record<string, string>;
};

type TResolveResult = {
  url: string;
  headers: Record<string, string>;
};

export type TScheme = OpenAPIObject;

export type TEnvironment = {
  name: string;
  description?: string;
  scheme: TScheme;
};

export type TPathfinderProps = {
  environments: TEnvironment[];
  settings?: Partial<TPathfinderSettings>;
};

const initSettings: Required<TPathfinderSettings> = {
  paths: {},
  mockServer: {},
  environment: '',
};

export class Pathfinder {
  static create(config: TPathfinderProps) {
    return new Pathfinder(config);
  }

  private _environments: TEnvironment[] = [];
  private _settings: Required<TPathfinderSettings> = initSettings;
  private _listeners: Record<
    string,
    (newSettings: Required<TPathfinderSettings>) => void
  > = {};

  constructor({ environments, settings }: TPathfinderProps) {
    this._environments = environments;

    const currentEnvironment = settings?.environment || environments[0]?.name;

    this._settings = {
      ...initSettings,
      ...settings,
      environment: currentEnvironment,
    };
  }

  public resolve({
    url,
    method,
    headers = {},
  }: TResolveParams): TResolveResult {
    const template = Object.keys(this.getScheme().paths).find(
      compareUrlWithTemplate(url)
    );
    const { paths } = this.getAllSettings();
    if (
      !template ||
      !paths[template] ||
      !paths[template][method] ||
      !paths[template][method]?.enabled
    ) {
      return { url, headers };
    }

    const templateObject = this.getScheme().paths[template];

    if (!templateObject[method]) {
      return { url, headers };
    }

    const settings = paths[template][method]!;
    const resultUrl = this.buildUrl(url, template, settings);

    const resultHeaders = this.buildHeaders(headers, settings);

    return {
      url: resultUrl,
      headers: resultHeaders,
    };
  }

  public getSettings(template: string, method: keyof Template) {
    const templateSettings = this.getAllSettings().paths[template];
    if (!templateSettings) return;
    return templateSettings[method];
  }

  public getScheme() {
    const { environment } = this.getAllSettings();
    return this._environments.find((env) => env.name === environment)!.scheme;
  }

  public getAllSettings() {
    return this._settings;
  }

  public addListener(
    event: 'update_settings',
    callback: (newSettings: Required<TPathfinderSettings>) => void
  ) {
    this._listeners[event] = callback;
    return {
      remove: () => {
        delete this._listeners[event];
      },
    };
  }

  public updateTemplateSettings(
    template: string,
    method: keyof Template,
    cb: (lastState: MethodObject) => MethodObject
  ) {
    this.prepareTemplateSettings(template, method);
    this._settings.paths[template][method] = cb(
      this._settings.paths[template][method]!
    );
    this.sendEvent('update_settings', { ...this._settings });
  }

  public updateMockServerSettings(
    cb: (lastState: TMockServerSettings) => TMockServerSettings
  ) {
    const { environment, mockServer } = this.getAllSettings();
    this._settings.mockServer[environment] = cb(
      mockServer[environment] || {
        domain: '',
        headers: {},
        queryParams: {},
      }
    );
    this.sendEvent('update_settings', { ...this._settings });
  }

  public setEnvironment(environment: string) {
    this._settings.environment = environment;
    this.sendEvent('update_settings', { ...this._settings });
  }

  private sendEvent(event: 'update_settings', data: any) {
    if (this._listeners[event]) {
      this._listeners[event](data);
    }
  }

  private prepareTemplateSettings(template: string, method: keyof Template) {
    if (!this._settings.paths[template]) {
      this._settings.paths[template] = {};
    }

    if (!this._settings.paths[template][method]) {
      this._settings.paths[template][method] = {
        enabledMock: false,
        enabled: false,
      };
    }
  }

  private buildUrl(
    url: string,
    template: string,
    settings: MethodObject
  ): string {
    const { pathname, hostname, protocol, port, search } = new URL(url);
    let pathParameters = getPathParameters(pathname, template);
    let queryParameters = getQueryParams(search);

    let domain = createDomain(protocol, hostname, port);

    if (settings.enabledMock && this.canUseMockServer()) {
      queryParameters = {
        ...queryParameters,
        ...this.getQueryParamsMockServer(),
      };
      domain = this.getDomainMockServer();
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

    const path = generatePath(template, {
      pathParameters: pathParameters,
      queryParameters: queryParameters,
    });

    return `${domain}${path}`;
  }

  private buildHeaders(
    originalHeaders: Record<string, string>,
    settings: MethodObject
  ) {
    let headers = { ...originalHeaders };

    if (settings.enabledMock && this.canUseMockServer()) {
      headers = {
        ...headers,
        ...this.getHeadersMockServer(),
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

  private canUseMockServer() {
    const { mockServer, environment } = this.getAllSettings();
    return Boolean(mockServer[environment] && mockServer[environment].domain);
  }

  private getDomainMockServer() {
    const { mockServer, environment } = this.getAllSettings();
    if (!mockServer[environment] || !mockServer[environment].domain) {
      throw Error('getDomainMockServer() was called before canUseMockServer()');
    }
    return mockServer[environment].domain;
  }

  private getQueryParamsMockServer() {
    const { mockServer, environment } = this.getAllSettings();
    if (!mockServer[environment] || !mockServer[environment].domain) {
      throw Error(
        'getQueryParamsMockServer() was called before canUseMockServer()'
      );
    }
    const queryParams: Record<string, string> = {};
    Object.entries(mockServer[environment].queryParams || {}).forEach(
      ([key, value]) => {
        queryParams[key] = String(value);
      }
    );
    return queryParams;
  }

  private getHeadersMockServer() {
    const { mockServer, environment } = this.getAllSettings();
    if (!mockServer[environment] || !mockServer[environment].domain) {
      throw Error(
        'getHeadersMockServer() was called before canUseMockServer()'
      );
    }
    return mockServer[environment].headers || {};
  }
}
