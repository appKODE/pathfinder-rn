import { URL } from 'react-native-url-polyfill';
import { parse } from 'querystring';

type TBuildUrlInputParams = {
  pathParameters?: Record<string, string>;
  queryParameters?: Record<string, string>;
};

export const generatePath = (
  template: string,
  { pathParameters = {}, queryParameters = {} }: TBuildUrlInputParams
) => {
  const withPathParams = template.replace(/{(\w*)}/gm, function (_, e) {
    return pathParameters[e];
  });

  let queryChunks: string[] = [];
  let queryString = '';

  Object.keys(queryParameters).forEach((paramKey) => {
    queryChunks.push(`${paramKey}=${queryParameters[paramKey]}`);
  });

  if (queryChunks.length > 0) {
    queryString = '?' + queryChunks.join('&');
  }

  return withPathParams + queryString;
};

export const compareUrlWithTemplate = (url: string) => {
  const { pathname } = new URL(url);
  return (template: string) => {
    const regexp = template.replace(/{.+}/g, '.+');
    return (
      new RegExp(regexp).test(pathname) &&
      pathname.split('/').length === template.split('/').length
    );
  };
};

export const getPathParameters = (pathname: string, template: string) => {
  const pathParameters: Record<string, string> = {};
  const pathChunk = pathname.split('/');
  const pathParamsChunk = template.split('/');
  pathParamsChunk.forEach((chunk, index) => {
    if (chunk.startsWith('{') && chunk.endsWith('}')) {
      pathParameters[chunk.replace(/{|}/g, '')] = pathChunk[index];
    }
  });
  return pathParameters;
};

export const getQueryParams = (search: string): Record<string, string> => {
  return parse(search) as any;
};

export const createDomain = (
  protocol: string,
  hostname: string,
  port?: string
) => {
  return `${protocol}//${hostname}${port ? ':' + port : ''}`;
};
