import React from 'react';
import type {
  Pathfinder,
  TPathfinderSettings,
  TPathfinderProps,
} from '../pathfinder/Pathfinder';

export interface IPathfinderContext extends TPathfinderProps {
  pathfinder: Pathfinder;
  settings: TPathfinderSettings;
}

export const PathfinderContext = React.createContext<IPathfinderContext>(
  {} as any
);
