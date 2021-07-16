import React from 'react';
import type { Pathfinder, TPathfinderSettings } from '../pathfinder/Pathfinder';

export interface IPathfinderContext extends TPathfinderSettings {
  pathfinder: Pathfinder;
}

export const PathfinderContext = React.createContext<IPathfinderContext>(
  {} as any
);
