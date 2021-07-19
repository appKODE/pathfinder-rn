import { URL } from 'react-native-url-polyfill';

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

export type TPathfinderSettings = {
  mockServer?: {
    domain: string;
    headers: Record<string, string>;
    queryParams: Record<string, string | number | boolean>;
  };
  paths: Record<string, Template>;
};

type ResolveParams = {
  url: string;
  method: keyof Template;
  headers?: Record<string, string>;
};

type ResolveResult = {
  url: string;
  headers: Record<string, string>;
};

export type TPathfinderProps = {
  scheme: OpenAPIObject;
  settings?: Partial<TPathfinderSettings>;
};

const initSettings = {
  paths: {},
};

export class Pathfinder {
  static create(config: TPathfinderProps) {
    return new Pathfinder(config);
  }

  private _scheme: OpenAPIObject;
  private _settings: TPathfinderSettings = initSettings;
  private _listeners: Record<
    string,
    (newSettings: TPathfinderSettings) => void
  > = {};

  constructor({ scheme, settings }: TPathfinderProps) {
    this._scheme = scheme;
    this._settings = {
      ...initSettings,
      ...settings,
    };
  }

  resolve({ url, method, headers = {} }: ResolveParams): ResolveResult {
    const template = Object.keys(this._scheme.paths).find(
      compareUrlWithTemplate(url)
    );

    if (
      !template ||
      !this._settings.paths[template] ||
      !this._settings.paths[template][method] ||
      !this._settings.paths[template][method]?.enabled
    ) {
      return { url, headers };
    }

    const templateObject = this._scheme.paths[template];

    if (!templateObject[method]) {
      return { url, headers };
    }

    const settings = this._settings.paths[template][method]!;
    const resultUrl = this.buildUrl(url, template, settings);

    const resultHeaders = this.buildHeaders(headers, settings);

    return {
      url: resultUrl,
      headers: resultHeaders,
    };
  }

  getSettings(template: string, method: keyof Template) {
    const templateSettings = this._settings.paths[template];
    if (!templateSettings) return;
    return templateSettings[method];
  }

  getScheme() {
    return this._scheme;
  }

  getAllSettings() {
    return this._settings;
  }

  addListener(
    event: 'update_settings',
    callback: (newSettings: TPathfinderSettings) => void
  ) {
    this._listeners[event] = callback;
    return {
      remove: () => {
        delete this._listeners[event];
      },
    };
  }

  updateTemplateSettings(
    template: string,
    method: keyof Template,
    cb: (lastState: MethodObject) => MethodObject
  ) {
    this.prepareTemplateSettings(template, method);
    this._settings.paths[template][method] = cb(
      this._settings.paths[template][method]!
    );
    if (this._listeners.update_settings) {
      this._listeners.update_settings({ ...this._settings });
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
    return Boolean(
      this._settings.mockServer && this._settings.mockServer.domain
    );
  }

  private getDomainMockServer() {
    if (!this._settings.mockServer || !this._settings.mockServer.domain) {
      throw Error('getDomainMockServer() was called before canUseMockServer()');
    }
    return this._settings.mockServer.domain;
  }

  private getQueryParamsMockServer() {
    if (!this._settings.mockServer || !this._settings.mockServer.domain) {
      throw Error(
        'getQueryParamsMockServer() was called before canUseMockServer()'
      );
    }
    const queryParams: Record<string, string> = {};
    Object.entries(this._settings.mockServer.queryParams || {}).forEach(
      ([key, value]) => {
        queryParams[key] = String(value);
      }
    );
    return queryParams;
  }

  private getHeadersMockServer() {
    if (!this._settings.mockServer || !this._settings.mockServer.domain) {
      throw Error(
        'getHeadersMockServer() was called before canUseMockServer()'
      );
    }
    return this._settings.mockServer.headers || {};
  }
}
