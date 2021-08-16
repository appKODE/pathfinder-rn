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
