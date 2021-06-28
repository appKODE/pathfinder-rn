import { URL } from 'react-native-url-polyfill';

export function parseURL(url: string) {
  return new URL(url);
}
