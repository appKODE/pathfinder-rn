import React, { useMemo, useRef, useState } from 'react';
import { Pathfinder, TPathfinderSettings } from '../pathfinder';
import { PathfinderContext } from './PathfinderContext';

export type TPathfinderProviderProps = TPathfinderSettings;

export const PathfinderProvider: React.FC<TPathfinderProviderProps> = ({
  children,
  scheme,
  settings,
}) => {
  const instance = useRef(Pathfinder.create({ scheme, settings }));
  const [_settings, setSettings] = useState(settings || { paths: {} });
  React.useEffect(() => {
    const event = instance.current.addListener('update_settings', setSettings);
    return () => {
      event.remove();
    };
  }, [_settings]);
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
