import * as React from 'react';
import { Linking } from 'react-native';
import DeepLinkContext, { DeepLinkEvents } from './deeplink-context';
import query from 'query-string';
import type { TDeepLinkHandlerParams } from './types';

const getParsedUrl = (url: string): TDeepLinkHandlerParams => {
  const parsedParams = query.parseUrl(url);
  return {
    ...parsedParams,
    mapPath: parsedParams.url.replace(/.+:\/\//s, '').split('/'),
  };
};

type Props = {
  children: React.ReactNode;
};

export const DeepLink = ({ children }: Props) => {
  const subscriptions = React.useRef<Record<string, DeepLinkEvents>>({});

  React.useEffect(() => {
    const onReceivedEvent = (url: string | null) => {
      if (!url) {
        return;
      }
      const parsedUrl: TDeepLinkHandlerParams = getParsedUrl(url);
      Object.values(subscriptions.current)
        .filter((e) => !!e.onReceive)
        .forEach((e) => {
          e.onReceive(parsedUrl);
        });
    };

    const handleOpenURL = (event: { url: string }) => {
      onReceivedEvent(event.url);
    };

    Linking.getInitialURL().then(onReceivedEvent);
    Linking.addEventListener('url', handleOpenURL);
    return () => {
      Linking.removeEventListener('url', handleOpenURL);
    };
  }, []);

  const value = React.useMemo(
    () => ({
      subscribe: (uuid: string, events: DeepLinkEvents) => {
        subscriptions.current[uuid] = events;
      },
      unsubscribe: (uuid: string) => {
        delete subscriptions.current[uuid];
      },
    }),
    []
  );

  return (
    <DeepLinkContext.Provider value={value}>
      {children}
    </DeepLinkContext.Provider>
  );
};
