import React from 'react';

import type { PathfinderProviderProps } from '../pathfinder-react';
import { usePersistSettings } from './features/persist-settings';
import { PathResolver } from './features/path-resolver';
import type { TAsyncStorage } from './types';
import { App } from './app';
import type { PathfinderProps as BaseProps } from './types';

export type PathfinderProps = Omit<
  BaseProps,
  'children' | 'autostartForDev'
> & {
  Provider: React.ComponentType<PathfinderProviderProps>;
  asyncStorage: TAsyncStorage;
};

export const Pathfinder = ({
  Provider,
  asyncStorage,
  initialSettings = {
    paths: {},
    servers: {},
  },
  devMode,
  initialEnvironment,
  environments,
  renderContent,
  onChangeEnvironment,
}: PathfinderProps) => {
  const [savedSettings, onChangeSettings] = usePersistSettings(
    initialSettings,
    {
      asyncStorage,
    }
  );

  if (savedSettings === undefined) {
    return null;
  }

  return (
    <Provider
      devMode={devMode}
      initialEnvironment={initialEnvironment}
      environments={environments}
      initialSettings={savedSettings}
      onChangeSettings={onChangeSettings}
      onChangeEnvironment={onChangeEnvironment}
    >
      <PathResolver devMode={devMode} />
      <App renderContent={renderContent} />
    </Provider>
  );
};
