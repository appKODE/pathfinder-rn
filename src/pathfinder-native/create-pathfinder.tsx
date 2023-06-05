import React, { useCallback } from 'react';

import type { PathfinderConfiguration } from '../pathfinder';
import { createPathfinderProvider } from '../pathfinder-react';
import { DeepLink, DevtoolsDeeplink } from './features/deeplink';
import { usePersister } from './features/persister';
import { Pathfinder } from './pathfinder';
import type { PathfinderProps, TAsyncStorage } from './types';

const STORAGE_KEY_ENABLED_PATHFINDER = '@pathfinder/enabled';

/**
 * Create React Native Pathfinder
 * @param pathfinderConfig pathfinder configuration
 * @param asyncStorage async storage for persist settings
 * @returns Pathfinder component
 */
export const createPathfinder = (
  pathfinderConfig: PathfinderConfiguration,
  asyncStorage: TAsyncStorage
) => {
  const PathfinderProvider = createPathfinderProvider(pathfinderConfig);
  return ({ autostartForDev, children, ...other }: PathfinderProps) => {
    const [enablePathfinder, setEnablePathfinderState] = usePersister(
      {
        enabled: autostartForDev && __DEV__,
      },
      {
        storageKey: STORAGE_KEY_ENABLED_PATHFINDER,
        asyncStorage: asyncStorage,
      }
    );

    const onChangeEnabledPathfinder = useCallback(
      (enabled: boolean) => {
        setEnablePathfinderState({ enabled });
      },
      [setEnablePathfinderState]
    );

    if (!enablePathfinder) {
      return null;
    }

    return (
      <>
        {children}
        {enablePathfinder?.enabled && (
          <Pathfinder
            {...other}
            asyncStorage={asyncStorage}
            Provider={PathfinderProvider}
          />
        )}
        <DeepLink>
          <DevtoolsDeeplink onShownStateChange={onChangeEnabledPathfinder} />
        </DeepLink>
      </>
    );
  };
};
