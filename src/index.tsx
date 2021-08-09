import React, { useCallback, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import DeepLink from './features/deeplink/DeepLink';
import DevtoolsDeeplink from './features/deeplink/deeplinks/DevtoolsDeeplink';
import { PathfinderPage } from './flows/main/pages/PathfinderPage';
import {
  PathfinderProvider,
  TPathfinderProviderProps,
  TPathfinderSettings,
} from './features/pathfinder-react';
import { PathResolver } from './features/path-resolver/PathResolver';

const STORAGE_KEY = '@pathfinder/settings';

const PathfinderPure: React.FC<TPathfinderProviderProps> = ({
  settings,
  ...props
}) => {
  const [enablePathfinder, setEnablePathfinderState] = useState(__DEV__);
  const [savedSettings, setNewSettings] = useState<
    Partial<TPathfinderSettings> | undefined
  >(undefined);

  const onChangeSettings = useCallback((newSettings: TPathfinderSettings) => {
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newSettings));
  }, []);

  React.useEffect(() => {
    const init = async () => {
      try {
        const result = await AsyncStorage.getItem(STORAGE_KEY);
        if (result) {
          setNewSettings(JSON.parse(result));
        } else {
          setNewSettings(settings);
        }
      } catch (e) {
        setNewSettings(settings);
      }
    };
    if (savedSettings === undefined) {
      init();
    }
  }, [savedSettings, settings]);

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
