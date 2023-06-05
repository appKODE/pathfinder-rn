import React from 'react';
import { StyleSheet } from 'react-native';

import { Typography, Layout } from '../../../ui/atoms';

type TSectionHeaderProps = {
  children: string;
};

export const SectionHeader = ({ children }: TSectionHeaderProps) => {
  return (
    <Layout.Cal
      spacing={{ left: 2, right: 2, top: 0.5, bottom: 0.5 }}
      style={styles.root}
    >
      <Typography variant="h5">{children}</Typography>
    </Layout.Cal>
  );
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: 'rgba(255, 255, 255, .85)',
  },
});
