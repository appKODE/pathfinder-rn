import React, { useMemo, useRef, useState } from 'react';
import {
  Pathfinder,
  TPathfinderProps,
  TPathfinderSettings,
} from '../pathfinder';
import { PathfinderContext } from './PathfinderContext';

export type TPathfinderProviderProps = TPathfinderProps & {
  devMode?: boolean;
  onChangeState?: (state: TPathfinderSettings) => void;
  onChangeEnvironment?: (env: string) => void;
};

export const PathfinderProvider: React.FC<TPathfinderProviderProps> = ({
  children,
  environments,
  settings,
  devMode,
  onChangeState,
  onChangeEnvironment,
}) => {
  const instance = useRef(Pathfinder.create({ environments, settings }));
  const [pathfinderState, setState] = useState<Required<TPathfinderSettings>>(
    instance.current.getAllSettings()
  );

  React.useEffect(() => {
    const event = instance.current.addListener(
      'update_settings',
      (newState) => {
        if (devMode) {
          console.log('Pathfinder - set state:', newState);
        }
        if (pathfinderState.environment !== newState.environment) {
          onChangeEnvironment && onChangeEnvironment(newState.environment);
        }
        setState(newState);
        onChangeState && onChangeState(newState);
      }
    );
    return () => {
      event.remove();
    };
  }, [pathfinderState, devMode, onChangeState, onChangeEnvironment]);

  React.useEffect(() => {
    if (settings?.environment) {
      instance.current.setEnvironment(settings?.environment);
    }
  }, [settings]);

  const value = useMemo(
    () => ({
      pathfinder: instance.current,
      scheme: environments.find(
        (env) => env.name === pathfinderState.environment
      )!.scheme,
      environments,
      settings: pathfinderState,
    }),
    [pathfinderState, environments]
  );
  return (
    <PathfinderContext.Provider value={value}>
      {children}
    </PathfinderContext.Provider>
  );
};
