import React, { useState } from 'react';

import { App } from './pathfinder-native/App';
import DeepLink from './pathfinder-native/features/deeplink/DeepLink';
import DevtoolsDeeplink from './pathfinder-native/features/deeplink/deeplinks/DevtoolsDeeplink';
import { PathResolver } from './pathfinder-native/features/path-resolver/PathResolver';
import { usePeristSettings } from './pathfinder-native/features/persist-settings';
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

const PathfinderPure: React.FC<TPathfinderProps> = ({
  settings,
  autostartForDev,
  ...props
}) => {
  const [enablePathfinder, setEnablePathfinderState] = useState(
    autostartForDev && __DEV__
  );
  const [savedSettings, onChangeSettings] = usePeristSettings(settings);

  return (
    <>
      <DeepLink>
        <DevtoolsDeeplink onShownStateChange={setEnablePathfinderState} />
      </DeepLink>
      {savedSettings !== undefined && enablePathfinder && (
        <PathfinderProvider
          {...props}
          onChangeState={onChangeSettings}
          settings={savedSettings}
        >
          <PathResolver devMode={props.devMode} />
          <App />
        </PathfinderProvider>
      )}
    </>
  );
};

const Pathfinder: React.FC<TPathfinderProps> = ({ children, ...props }) => {
  return (
    <>
      {children}
      <PathfinderPure {...props} />
    </>
  );
};
export default Pathfinder;
