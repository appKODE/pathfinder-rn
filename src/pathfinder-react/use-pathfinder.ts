import { useContext } from 'react';
import { PathfinderContext } from './context';

export const usePathfinder = () => {
  return useContext(PathfinderContext);
};
