import { useEffect, useMemo, useRef, useState } from 'react';
import {
  Pathfinder,
  PathfinderConfiguration,
  type PathfinderSettings,
} from '../pathfinder';
import { PathfinderContext } from './context';
import type { PathfinderProviderProps } from './types';

export const createPathfinderProvider = (
  pathfinderConfig: PathfinderConfiguration
) => {
  return ({
    devMode,
    initialEnvironment,
    environments,
    initialSettings,
    children,
    onChangeSettings,
    onChangeEnvironment,
  }: PathfinderProviderProps) => {
    const pathfinder = useRef(
      Pathfinder.create(pathfinderConfig, initialSettings)
    );
    const [environment, setEnvironment] = useState(initialEnvironment);
    const [settings, setSettings] =
      useState<PathfinderSettings>(initialSettings);

    useEffect(() => {
      const listener = pathfinder.current.addListener(
        'update_settings',
        (newSettings) => {
          if (devMode) {
            console.log('Pathfinder - set state:', newSettings);
          }
          setSettings(newSettings);
          onChangeSettings?.(newSettings);
        }
      );
      return () => {
        listener.remove();
      };
    }, [devMode, onChangeSettings]);

    const value = useMemo(() => {
      return {
        environment,
        environments,
        settings,
        pathfinder: pathfinder.current,
        setEnvironment: (env: string) => {
          setEnvironment(env);
          onChangeEnvironment?.(env);
        },
      };
    }, [environment, environments, settings, onChangeEnvironment]);

    return (
      <PathfinderContext.Provider value={value}>
        {children}
      </PathfinderContext.Provider>
    );
  };
};
