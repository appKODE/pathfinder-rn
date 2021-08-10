import type query from 'query-string';

export type TDeepLinkHandlerParams = query.ParsedUrl & {
  mapPath: string[];
};

export type DeeplinkObj = {
  open: () => Promise<any>;
  toString: () => string;
};
