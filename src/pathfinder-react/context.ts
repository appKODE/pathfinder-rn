import { createContext } from 'react';
import {
  Pathfinder,
  PathfinderConfiguration,
  type PathfinderSettings,
} from '../pathfinder';

export type PathfinderContext = {
  environment: string;
  environments: string[];
  settings: PathfinderSettings;
  pathfinder: Pathfinder;
  setEnvironment: (env: string) => void;
};

export const PathfinderContext = createContext<PathfinderContext>({
  environment: '',
  environments: [],
  settings: {
    paths: {},
    servers: {},
  },
  setEnvironment: function (_: string): void {
    throw new Error('Function not implemented.');
  },
  pathfinder: Pathfinder.create(PathfinderConfiguration.create()),
});
