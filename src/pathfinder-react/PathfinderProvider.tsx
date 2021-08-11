import React, { useMemo, useRef, useState } from 'react';
import {
  Pathfinder,
  TPathfinderProps,
  TPathfinderSettings,
} from '../pathfinder';
import { PathfinderContext } from './PathfinderContext';

export type TPathfinderProviderProps = TPathfinderProps & {
  devMode?: boolean;
  onChangeState: (state: TPathfinderSettings) => void;
};

export const PathfinderProvider: React.FC<TPathfinderProviderProps> = ({
  children,
  scheme,
  settings,
  devMode,
  onChangeState,
}) => {
  const instance = useRef(Pathfinder.create({ scheme, settings }));
  const [_settings, setSettings] = useState<TPathfinderSettings>(
    instance.current.getAllSettings()
  );
  React.useEffect(() => {
    const event = instance.current.addListener(
      'update_settings',
      (newState) => {
        if (devMode) {
          console.log('Pathfinder - set state:', newState);
        }
        setSettings(newState);
        onChangeState(newState);
      }
    );
    return () => {
      event.remove();
    };
  }, [_settings, devMode, onChangeState]);
  const value = useMemo(
    () => ({
      pathfinder: instance.current,
      scheme,
      settings: _settings,
    }),
    [_settings, scheme]
  );
  return (
    <PathfinderContext.Provider value={value}>
      {children}
    </PathfinderContext.Provider>
  );
};
