import React from 'react';

import type {
  Pathfinder,
  TPathfinderSettings,
  TScheme,
  TEnviroment,
} from '../pathfinder';

export interface IPathfinderContext {
  pathfinder: Pathfinder;
  settings: Required<TPathfinderSettings>;
  scheme: TScheme;
  enviroments: TEnviroment[];
}

export const PathfinderContext = React.createContext<IPathfinderContext>(
  {} as any
);
