import { useContext } from 'react';
import { PathfinderContext } from './PathfinderContext';

export const usePathfinder = () => {
  return useContext(PathfinderContext);
};
