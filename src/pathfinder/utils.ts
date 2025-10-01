import * as URLPolyfill from 'react-native-url-polyfill';
import { parse } from 'querystring';

type TBuildUrlInputParams = {
  generatePathFromTemplate: boolean;
  pathParameters?: Record<string, string>;
  queryParameters?: Record<string, string>;
};

export const generatePath = (
  originalPath: string,
  template: string,
  {
    generatePathFromTemplate,
    pathParameters = {},
    queryParameters = {},
  }: TBuildUrlInputParams
) => {
  const withPathParams = template.replace(/{(\w*)}/gm, function (_, e) {
    return pathParameters[e];
  });

  const templateChunks = withPathParams.split('/').reverse();
  const resultPath = generatePathFromTemplate
    ? withPathParams
    : originalPath
        .split('/')
        .reverse()
        .map((chunk, index) => templateChunks[index] || chunk)
        .reverse()
        .join('/');

  let queryChunks: string[] = [];
  let queryString = '';

  Object.keys(queryParameters).forEach((paramKey) => {
    queryChunks.push(`${paramKey}=${queryParameters[paramKey]}`);
  });

  if (queryChunks.length > 0) {
    queryString = '?' + queryChunks.join('&');
  }
  return resultPath + queryString;
};

export const compareUrlWithTemplate = (url: string, strict = false) => {
  const { pathname } = new Url(url);
  return (template: string) => {
    const regexp = template.replace(/{.+}/g, '.+');
    const templateChunks = regexp.split('/').filter(Boolean).reverse();
    const pathChunks = pathname.split('/').filter(Boolean).reverse();
    if (strict) {
      return (
        new RegExp(regexp).test(pathname) &&
        templateChunks.every((chunk, index) => chunk === pathChunks[index])
      );
    }
    return (
      new RegExp(regexp).test(pathname) &&
      templateChunks.every((chunk, index) =>
        new RegExp(chunk).test(pathChunks[index])
      )
    );
  };
};

export const getPathParameters = (pathname: string, template: string) => {
  const pathParameters: Record<string, string> = {};
  const pathChunk = pathname.split('/').reverse();
  const pathParamsChunk = template.split('/').reverse();
  pathParamsChunk.forEach((chunk, index) => {
    if (chunk.startsWith('{') && chunk.endsWith('}')) {
      pathParameters[chunk.replace(/{|}/g, '')] = pathChunk[index];
    }
  });
  return pathParameters;
};

export const getQueryParams = (search: string): Record<string, string> => {
  if (search.startsWith('?')) {
    search = search.replace('?', '');
  }
  return parse(search) as any;
};

export const createDomain = (
  protocol: string,
  hostname: string,
  port?: string
) => {
  if (!protocol.endsWith(':')) {
    protocol += ':';
  }
  return `${protocol}//${hostname}${port ? ':' + port : ''}`;
};

export const Url = URLPolyfill.URL;
