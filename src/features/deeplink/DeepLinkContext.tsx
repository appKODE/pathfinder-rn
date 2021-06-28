import * as React from 'react';
import type { TDeepLinkHandlerParams } from './types';

export interface DeepLinkEvents {
  onOpen: (url: TDeepLinkHandlerParams) => void;
  onReceive: (url: TDeepLinkHandlerParams) => void;
}

export type TDeepLinkContext = {
  subscribe: (uuid: string, options: DeepLinkEvents) => void;
  unsubscribe: (uuid: string) => void;
};

export default React.createContext<TDeepLinkContext>({
  subscribe: () => {},
  unsubscribe: () => {},
});
