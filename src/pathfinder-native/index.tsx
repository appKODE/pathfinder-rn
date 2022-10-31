import React, { ReactNode, useCallback } from 'react';

import { App } from './App';
import DeepLink from './features/deeplink/DeepLink';
import DevtoolsDeeplink from './features/deeplink/deeplinks/DevtoolsDeeplink';
import { PathResolver } from './features/path-resolver/PathResolver';
import { usePersistSettings } from './features/persist-settings';
import { usePersister } from './features/persister';
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
  children?: ReactNode;
};

const STORAGE_KEY_ENABLED_PATHFINDER = '@pathfinder-settings';

const PathfinderPure = ({
  settings,
  asyncStorage,
  ...props
}: TPathfinderProps) => {
  const [savedSettings, onChangeSettings] = usePersistSettings(settings, {
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

const Pathfinder = ({
  children,
  autostartForDev,
  ...props
}: TPathfinderProps) => {
  const [enablePathfinder, setEnablePathfinderState] = usePersister(
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
