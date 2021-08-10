import React, { useMemo, useState, useCallback } from 'react';
import { FlatList } from 'react-native';

import { ApiListItem } from '../organisms';
import { usePathfinder } from '../../../../pathfinder-react';
import { Layout, TextInput } from '../../../ui/atoms';

export const PathfinderPage: React.FC = () => {
  const pathfinder = usePathfinder();
  const [searchQuery, setSearchQuery] = useState('');
  const [shownDetailsID, setShowDetailsID] = useState<string | null>(null);
  const toggleDetails = useCallback(
    (path: string, method: string) =>
      setShowDetailsID((prev) => {
        if (prev === `${path}${method}`) {
          return null;
        }
        return `${path}${method}`;
      }),
    []
  );

  const paths = useMemo(() => {
    return Object.keys(pathfinder.scheme.paths).filter(
      (path) =>
        !searchQuery || ~path.toLowerCase().indexOf(searchQuery.toLowerCase())
    );
  }, [pathfinder, searchQuery]);
  return (
    <>
      <Layout.Cal spacing={{ left: 2, right: 2 }}>
        <TextInput
          onChangeText={setSearchQuery}
          value={searchQuery}
          placeholder="Поиск"
        />
      </Layout.Cal>
      <FlatList
        data={paths}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <ApiListItem
            path={item}
            onPress={toggleDetails}
            shownDetailsID={shownDetailsID}
            {...pathfinder.scheme.paths[item]}
          />
        )}
      />
    </>
  );
};
