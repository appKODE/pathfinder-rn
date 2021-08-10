import React, { useCallback, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import DeepLink from './pathfinder-native/features/deeplink/DeepLink';
import DevtoolsDeeplink from './pathfinder-native/features/deeplink/deeplinks/DevtoolsDeeplink';
import {
  PathfinderProvider,
  TPathfinderProviderProps,
  TPathfinderSettings,
} from './pathfinder-react';
import { PathResolver } from './pathfinder-native/features/path-resolver/PathResolver';
import { App } from './pathfinder-native';

const STORAGE_KEY = '@pathfinder/settings';

type Props = Omit<TPathfinderProviderProps, 'onChangeState'>;

const PathfinderPure: React.FC<Props> = ({ settings, ...props }) => {
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
          <App />
        </PathfinderProvider>
      )}
    </>
  );
};

const Pathfinder: React.FC<Props> = ({ children, ...props }) => {
  return (
    <>
      {children}
      <PathfinderPure {...props} />
    </>
  );
};
export default Pathfinder;
