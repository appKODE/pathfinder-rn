import type {
  OpenAPIObject,
  OperationObject,
  ParameterObject,
} from './open-api/open-api';

interface URL {
  hash: string;
  host: string;
  hostname: string;
  href: string;
  toString(): string;
  readonly origin: string;
  password: string;
  pathname: string;
  port: string;
  protocol: string;
  search: string;
  readonly searchParams: URLSearchParams;
  username: string;
  toJSON(): string;
}

declare var URL: {
  prototype: URL;
  new (url: string, base?: string | URL): URL;
  createObjectURL(object: any): string;
  revokeObjectURL(url: string): void;
};

export type Specification = OpenAPIObject;

export type MethodObject = Pick<OperationObject, 'requestBody'> & {
  parameters?: ParameterObject[];
  enabledMock: boolean;
  enabled: boolean;
};

export type Template = {
  get?: MethodObject;
  put?: MethodObject;
  post?: MethodObject;
  delete?: MethodObject;
};

export type ResolveParams = {
  url: string;
  method: keyof Template;
  headers?: Record<string, string>;
};

export type ResolveResult = {
  url: string;
  headers: Record<string, string>;
};

export type MockServerSettings = {
  domain: string;
  headers: Record<string, string>;
  queryParams: Record<string, string | number | boolean>;
};

export type PathfinderSettings = {
  paths: Record<string, Template>;
  servers: Record<string, MockServerSettings>;
};

export type Scheme = {
  /** unique specification name */
  name: string;
  /** openApi specification */
  specification: Specification;
  /** mock server options if needed */
  server?: MockServerSettings;
};
