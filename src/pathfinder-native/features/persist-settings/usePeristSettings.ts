import React, { useCallback, useState, useRef } from 'react';

import type { TAsyncStorage } from '../../../pathfinder-native/types';
import type { TPathfinderSettings } from '../../../pathfinder-react';

const STORAGE_KEY = '@pathfinder/settings';

type TExtra = {
  asyncStorage: TAsyncStorage;
};

type TState = Partial<TPathfinderSettings> | undefined;

export const usePeristSettings = (
  initialSettings: TState,
  { asyncStorage }: TExtra
): [TState, (newSettings: TPathfinderSettings) => void] => {
  const [savedSettings, setNewSettings] = useState<TState>(undefined);
  const AsyncStorage = useRef(asyncStorage);

  const onChangeSettings = useCallback((newSettings: TPathfinderSettings) => {
    AsyncStorage.current.setItem(STORAGE_KEY, JSON.stringify(newSettings));
  }, []);

  React.useEffect(() => {
    const init = async () => {
      try {
        const result = await AsyncStorage.current.getItem(STORAGE_KEY);
        if (result) {
          setNewSettings(JSON.parse(result));
        } else {
          setNewSettings(initialSettings);
        }
      } catch (e) {
        setNewSettings(initialSettings);
      }
    };
    if (savedSettings === undefined) {
      init();
    }
  }, [savedSettings, initialSettings]);
  return [savedSettings, onChangeSettings];
};
