import React from 'react';

import type {
  Pathfinder,
  TPathfinderSettings,
  TScheme,
  TEnvironment,
} from '../pathfinder';

export interface IPathfinderContext {
  pathfinder: Pathfinder;
  settings: Required<TPathfinderSettings>;
  scheme: TScheme;
  environments: TEnvironment[];
}

export const PathfinderContext = React.createContext<IPathfinderContext>(
  {} as any
);
