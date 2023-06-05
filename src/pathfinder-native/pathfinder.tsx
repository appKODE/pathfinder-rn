import React from 'react';

import type {
  PathfinderProviderProps,
  PathfinderSettings,
} from '../pathfinder-react';
import { usePersistSettings } from './features/persist-settings';
import { PathResolver } from './features/path-resolver';
import type { TAsyncStorage } from './types';
import { App } from './app';

export type PathfinderProps = {
  devMode: boolean;
  initialEnvironment: string;
  environments: string[];
  initialSettings?: PathfinderSettings;
  asyncStorage: TAsyncStorage;
  Provider: React.ComponentType<PathfinderProviderProps>;
  onChangeEnvironment?: (env: string) => void;
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
      <App />
    </Provider>
  );
};
