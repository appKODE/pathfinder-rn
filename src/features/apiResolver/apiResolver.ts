import { parseURL } from '../../utils';

class Resolver {
  constructor() {}

  resolve(params: { method: string; url: string }) {
    console.log(parseURL(params.url));
    return params;
  }
}

export const apiResolver = new Resolver();
