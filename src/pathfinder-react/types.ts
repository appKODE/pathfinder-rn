import type { ReactNode } from 'react';
import type { PathfinderSettings } from '../pathfinder';

export type PathfinderProviderProps = {
  devMode?: boolean;
  initialEnvironment: string;
  environments: string[];
  initialSettings: PathfinderSettings;
  children: ReactNode | ReactNode[];
  onChangeSettings?: (newSettings: PathfinderSettings) => void;
  onChangeEnvironment?: (env: string) => void;
};
