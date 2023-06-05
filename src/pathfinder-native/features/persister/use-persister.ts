import React, { useCallback, useRef, useState } from 'react';

import type { TAsyncStorage } from '../../types';

type TExtra = {
  storageKey: string;
  asyncStorage: TAsyncStorage;
};

export function usePersister<T extends Object>(
  initialValue: T,
  { asyncStorage, storageKey }: TExtra
): [T | null, (newSettings: T) => void] {
  const [value, setValue] = useState<T | null>(null);
  const AsyncStorage = useRef(asyncStorage);
  const onChange = useCallback(
    (newValue: T) => {
      AsyncStorage.current.setItem(storageKey, JSON.stringify(newValue));
      setValue(newValue);
    },
    [storageKey]
  );

  React.useEffect(() => {
    const init = async () => {
      try {
        const result = await AsyncStorage.current.getItem(storageKey);
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
