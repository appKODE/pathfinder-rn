import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useCallback, useState } from 'react';

export function usePeristor<T extends Object>(
  storageKey: string,
  initialValue: T
): [T | null, (newSettings: T) => void] {
  const [value, setValue] = useState<T | null>(null);

  const onChange = useCallback(
    (newValue: T) => {
      AsyncStorage.setItem(storageKey, JSON.stringify(newValue));
      setValue(newValue);
    },
    [storageKey]
  );

  React.useEffect(() => {
    const init = async () => {
      try {
        const result = await AsyncStorage.getItem(storageKey);
        if (result) {
          setValue(JSON.parse(result));
        } else {
          setValue(initialValue);
        }
      } catch (e) {
        setValue(initialValue);
      }
    };
    if (value === null) {
      init();
    }
  }, [value, initialValue, storageKey]);
  return [value, onChange];
}
