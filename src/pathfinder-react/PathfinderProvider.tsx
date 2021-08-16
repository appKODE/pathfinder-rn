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
  onChangeEnviroment?: (env: string) => void;
};

export const PathfinderProvider: React.FC<TPathfinderProviderProps> = ({
  children,
  enviroments,
  settings,
  devMode,
  onChangeState,
  onChangeEnviroment,
}) => {
  const instance = useRef(Pathfinder.create({ enviroments, settings }));
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
        if (pathfinderState.enviroment !== newState.enviroment) {
          onChangeEnviroment && onChangeEnviroment(newState.enviroment);
        }
        setState(newState);
        onChangeState && onChangeState(newState);
      }
    );
    return () => {
      event.remove();
    };
  }, [pathfinderState, devMode, onChangeState, onChangeEnviroment]);

  React.useEffect(() => {
    if (settings?.enviroment) {
      instance.current.setEnviroment(settings?.enviroment);
    }
  }, [settings]);

  const value = useMemo(
    () => ({
      pathfinder: instance.current,
      scheme: enviroments.find(
        (env) => env.name === pathfinderState.enviroment
      )!.scheme,
      enviroments,
      settings: pathfinderState,
    }),
    [pathfinderState, enviroments]
  );
  return (
    <PathfinderContext.Provider value={value}>
      {children}
    </PathfinderContext.Provider>
  );
};
