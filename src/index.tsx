import React, { useState } from 'react';
import DeepLink from './features/deeplink/DeepLink';
import DevtoolsDeeplink from './features/deeplink/deeplinks/DevtoolsDeeplink';
import { PathfinderPage } from './flows/main/pages/PathfinderPage';

const Pathfinder: React.FC = ({ children }) => {
  const [enablePathfinder, setEnablePathfinderState] = useState(__DEV__);
  return (
    <>
      {children}
      <DeepLink>
        <DevtoolsDeeplink onShownStateChange={setEnablePathfinderState} />
      </DeepLink>
      {enablePathfinder && <PathfinderPage />}
    </>
  );
};
export default Pathfinder;
