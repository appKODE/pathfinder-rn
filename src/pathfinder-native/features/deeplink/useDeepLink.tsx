import React from 'react';
import Uuid from 'react-native-uuid';
import DeepLinkContext from './deeplink-context';
import type { TDeepLinkHandlerParams } from './types';

interface Options {
  condition: (params: TDeepLinkHandlerParams) => boolean;
  onReceived: (params: TDeepLinkHandlerParams) => void;
  onOpened: (params: TDeepLinkHandlerParams) => void;
}

export default function ({ condition, onReceived, onOpened }: Options) {
  const { subscribe, unsubscribe } = React.useContext(DeepLinkContext);

  const uuid = React.useRef(Uuid.v4()).current;

  React.useEffect(() => {
    const onOpen = (params: TDeepLinkHandlerParams) => {
      if (!condition(params)) {
        return;
      }
      onOpened(params);
    };

    const onReceive = (params: TDeepLinkHandlerParams) => {
      if (!condition(params)) {
        return;
      }
      onReceived(params);
    };

    subscribe(String(uuid), {
      onReceive,
      onOpen,
    });

    return () => {
      unsubscribe(String(uuid));
    };
  }, [subscribe, unsubscribe, onOpened, onReceived, condition, uuid]);

  return null;
}
