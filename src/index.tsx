import React, { useCallback } from 'react';

import { App } from './pathfinder-native/App';
import DeepLink from './pathfinder-native/features/deeplink/DeepLink';
import DevtoolsDeeplink from './pathfinder-native/features/deeplink/deeplinks/DevtoolsDeeplink';
import { PathResolver } from './pathfinder-native/features/path-resolver/PathResolver';
import { usePeristSettings } from './pathfinder-native/features/persist-settings';
import { usePeristor } from './pathfinder-native/features/persistor';
import {
  PathfinderProvider,
  TPathfinderProviderProps,
} from './pathfinder-react';

export type TPathfinderProps = Omit<
  TPathfinderProviderProps,
  'onChangeState'
> & {
  autostartForDev?: boolean;
};

const STORAGE_KEY_ENABLED_PATHFINDER = '@pathfinder-settings';

const PathfinderPure: React.FC<TPathfinderProps> = ({ settings, ...props }) => {
  const [savedSettings, onChangeSettings] = usePeristSettings(settings);

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
    STORAGE_KEY_ENABLED_PATHFINDER,
    {
      enabled: autostartForDev && __DEV__,
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
