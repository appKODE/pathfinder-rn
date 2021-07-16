import React, { useMemo } from 'react';
import { FlatList } from 'react-native';

import { PathfinderTemplate } from '../templates/PathfinderTemplate';
import { ApiListItem } from '../organisms';
import { usePathfinder } from '../../../features/pathfinder-react';

export const PathfinderPage: React.FC = () => {
  const pathfinder = usePathfinder();

  const paths = useMemo(() => {
    return Object.keys(pathfinder.scheme.paths);
  }, [pathfinder]);
  return (
    <PathfinderTemplate>
      <FlatList
        data={paths}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <ApiListItem path={item} {...pathfinder.scheme.paths[item]} />
        )}
      />
    </PathfinderTemplate>
  );
};
