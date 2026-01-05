import React, { useCallback, useMemo, useState } from 'react';
import { SectionList, type SectionListRenderItem } from 'react-native';

import { usePathfinder } from '../../../../pathfinder-react';
import { EnvironmentSelector } from '../../../features/environment-selector';
import { Layout, TextInput, Typography } from '../../../ui/atoms';
import { createSections } from '../libs';
import { SectionHeader } from '../molecules';
import { ApiListItem } from '../organisms';
import type { Section, ListItem } from '../types';

type RenderSections = (info: { section: Section }) => React.ReactElement | null;

export const HomePage = () => {
  const { pathfinder } = usePathfinder();
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

  const sections = useMemo(
    () => createSections(pathfinder.getSchemas(), searchQuery),
    [pathfinder, searchQuery]
  );

  const renderItem: SectionListRenderItem<ListItem> = useCallback(
    ({ item }) => {
      return (
        <ApiListItem
          path={item.path}
          onPress={toggleDetails}
          shownDetailsID={shownDetailsID ?? ''}
          {...item.data}
        />
      );
    },
    [shownDetailsID, toggleDetails]
  );

  const renderSectionHeader: RenderSections = useCallback(
    ({ section: { title } }) => <SectionHeader>{title}</SectionHeader>,
    []
  );

  return (
    <>
      <Layout.Cal spacing={{ left: 2, right: 2 }}>
        <EnvironmentSelector />
        <TextInput
          onChangeText={setSearchQuery}
          value={searchQuery}
          placeholder="Search"
        />
      </Layout.Cal>
      <SectionList
        sections={sections}
        keyExtractor={(item) => item.path}
        renderItem={renderItem}
        renderSectionHeader={renderSectionHeader}
        renderSectionFooter={SectionSeparatorComponent}
        stickySectionHeadersEnabled
      />
    </>
  );
};

const SectionSeparatorComponent: RenderSections = ({ section: { data } }) => (
  <Layout.Cal spacing={{ bottom: 5 }}>
    {data.length === 0 ? (
      <Typography variant="h5" textAlign="center" color="inactive">
        {'Not found'}
      </Typography>
    ) : null}
  </Layout.Cal>
);
