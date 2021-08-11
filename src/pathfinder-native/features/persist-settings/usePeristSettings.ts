import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useCallback, useState } from 'react';
import type { TPathfinderSettings } from '../../../pathfinder-react';

const STORAGE_KEY = '@pathfinder/settings';

type TState = Partial<TPathfinderSettings> | undefined;

export const usePeristSettings = (
  initialSettings: TState
): [TState, (newSettings: TPathfinderSettings) => void] => {
  const [savedSettings, setNewSettings] = useState<TState>(undefined);

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
