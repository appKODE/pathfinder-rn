import React, { useCallback, useState, useRef } from 'react';

import type { TAsyncStorage } from '../../types';
import type { PathfinderSettings } from '../../../pathfinder-react';

const STORAGE_KEY = '@pathfinder/settings-v2';

type Extra = {
  asyncStorage: TAsyncStorage;
};

type Settings = PathfinderSettings;

export const usePersistSettings = (
  initialSettings: Settings,
  { asyncStorage }: Extra
): [Settings | undefined, (newSettings: PathfinderSettings) => void] => {
  const [savedSettings, setNewSettings] = useState<Settings | undefined>(
    undefined
  );
  const AsyncStorage = useRef(asyncStorage);

  const onChangeSettings = useCallback((newSettings: PathfinderSettings) => {
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
