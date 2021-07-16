import { URL } from 'react-native-url-polyfill';

import type {
  OpenAPIObject,
  OperationObject,
  ParameterObject,
  RequestBodyObject,
} from '../../OpenApi';
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
};

type Template = {
  get?: MethodObject;
  put?: MethodObject;
  post?: MethodObject;
  delete?: MethodObject;
};

type Settings = {
  mockServer?: string;
  paths: Record<string, Template>;
};

export type TPathfinderSettings = {
  scheme: OpenAPIObject;
  settings?: Settings;
};

const initSettings = {
  paths: {},
};

export class Pathfinder {
  static create(config: TPathfinderSettings) {
    return new Pathfinder(config);
  }

  private _scheme: OpenAPIObject;
  private _settings: Settings = initSettings;
  private _listeners: Record<string, (newSettings: Settings) => void> = {};

  constructor({ scheme, settings }: TPathfinderSettings) {
    this._scheme = scheme;
    this._settings = settings || initSettings;
  }

  getUrl(url: string, method: keyof Template): string {
    const template = Object.keys(this._scheme.paths).find(
      compareUrlWithTemplate(url)
    );

    if (
      !template ||
      !this._settings.paths[template] ||
      !this._settings.paths[template][method]
    ) {
      return url;
    }

    const templateObject = this._scheme.paths[template];

    if (!templateObject[method]) {
      return url;
    }

    return this.buildUrl(
      url,
      template,
      this._settings.paths[template][method]!
    );
  }

  setTemplateSettings(
    template: string,
    method: keyof Template,
    config: {
      parameters?: ParameterObject[];
      requestBody?: RequestBodyObject;
      enabledMock?: boolean;
    }
  ) {
    if (!this._settings.paths[template]) {
      this._settings.paths[template] = {};
    }

    if (!this._settings.paths[template][method]) {
      this._settings.paths[template][method] = { enabledMock: false };
    }

    this._settings.paths[template][method] = {
      ...this._settings.paths[template][method],
      ...config,
      enabledMock:
        config.enabledMock === undefined
          ? this._settings.paths[template][method]!.enabledMock
          : config.enabledMock,
    };
    if (this._listeners.update_settings) {
      this._listeners.update_settings({ ...this._settings });
    }
  }

  getScheme() {
    return this._scheme;
  }

  addListener(
    event: 'update_settings',
    callback: (newSettings: Settings) => void
  ) {
    this._listeners[event] = callback;
    return {
      remove: () => {
        delete this._listeners[event];
      },
    };
  }

  private buildUrl(
    url: string,
    template: string,
    settings: MethodObject
  ): string {
    const { mockServer } = this._settings;
    const { pathname, hostname, protocol, port, search } = new URL(url);
    let pathParameters = getPathParameters(pathname, template);
    let queryParameters = getQueryParams(search);

    let domain = createDomain(protocol, hostname, port);

    if (settings.enabledMock && mockServer) {
      queryParameters.__dynamic = 'false';
      domain = mockServer;
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
}
