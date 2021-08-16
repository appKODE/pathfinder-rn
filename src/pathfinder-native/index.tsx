import React, { useCallback } from 'react';

import { App } from './App';
import DeepLink from './features/deeplink/DeepLink';
import DevtoolsDeeplink from './features/deeplink/deeplinks/DevtoolsDeeplink';
import { PathResolver } from './features/path-resolver/PathResolver';
import { usePeristSettings } from './features/persist-settings';
import { usePeristor } from './features/persistor';
import {
  PathfinderProvider,
  TPathfinderProviderProps,
} from '../pathfinder-react';
import type { TAsyncStorage } from './types';

export type TPathfinderProps = Omit<
  TPathfinderProviderProps,
  'onChangeState'
> & {
  asyncStorage: TAsyncStorage;
  autostartForDev?: boolean;
};

const STORAGE_KEY_ENABLED_PATHFINDER = '@pathfinder-settings';

const PathfinderPure: React.FC<TPathfinderProps> = ({
  settings,
  asyncStorage,
  ...props
}) => {
  const [savedSettings, onChangeSettings] = usePeristSettings(settings, {
    asyncStorage,
  });

  if (savedSettings === undefined) {
    return null;
  }
  return (
    <PathfinderProvider
      {...props}
      onChangeState={onChangeSettings}
      settings={savedSettings}
    >
      <PathResolver devMode={props.devMode} />
      <App />
    </PathfinderProvider>
  );
};

const Pathfinder: React.FC<TPathfinderProps> = ({
  children,
  autostartForDev,
  ...props
}) => {
  const [enablePathfinder, setEnablePathfinderState] = usePeristor(
    {
      enabled: autostartForDev && __DEV__,
    },
    {
      storageKey: STORAGE_KEY_ENABLED_PATHFINDER,
      asyncStorage: props.asyncStorage,
    }
  );

  const onChangeEnabledPathfinder = useCallback(
    (enabled: boolean) => {
      setEnablePathfinderState({ enabled });
    },
    [setEnablePathfinderState]
  );

  return (
    <>
      {children}
      {enablePathfinder?.enabled && <PathfinderPure {...props} />}
      <DeepLink>
        <DevtoolsDeeplink onShownStateChange={onChangeEnabledPathfinder} />
      </DeepLink>
    </>
  );
};
export default Pathfinder;
