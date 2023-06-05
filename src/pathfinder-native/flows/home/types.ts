import type { SectionListData } from 'react-native';
import type { PathItemObject } from 'src/pathfinder/open-api/open-api';

export type ListItem = {
  path: string;
  data: PathItemObject;
};

export type Section = SectionListData<ListItem>;
