import type { Scheme } from '../../../../pathfinder-react';
import type { ListItem, Section } from '../types';

export const createSections = (
  schemas: Scheme[],
  filter: string
): Section[] => {
  return schemas.map(({ name, specification }) => ({
    title: name,
    key: name,
    data: Object.keys(specification.paths)
      .filter(
        (path) => !filter || ~path.toLowerCase().indexOf(filter.toLowerCase())
      )
      .map<ListItem>((path) => ({
        path,
        data: specification.paths[path],
      })),
  }));
};
