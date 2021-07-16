import React, { useState } from 'react';
import DeepLink from './features/deeplink/DeepLink';
import DevtoolsDeeplink from './features/deeplink/deeplinks/DevtoolsDeeplink';
import { PathfinderPage } from './flows/main/pages/PathfinderPage';
import {
  PathfinderProvider,
  TPathfinderProviderProps,
} from './features/pathfinder-react';
import { PathResolver } from './features/path-resolver/PathResolver';

const PathfinderPure: React.FC<TPathfinderProviderProps> = (props) => {
  const [enablePathfinder, setEnablePathfinderState] = useState(__DEV__);
  return (
    <>
      <DeepLink>
        <DevtoolsDeeplink onShownStateChange={setEnablePathfinderState} />
      </DeepLink>
      {enablePathfinder && (
        <PathfinderProvider {...props}>
          <PathResolver />
          <PathfinderPage />
        </PathfinderProvider>
      )}
    </>
  );
};

const Pathfinder: React.FC<TPathfinderProviderProps> = ({
  children,
  ...props
}) => {
  return (
    <>
      {children}
      <PathfinderPure {...props} />
    </>
  );
};
export default Pathfinder;
