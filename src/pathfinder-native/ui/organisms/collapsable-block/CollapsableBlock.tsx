import React, { useCallback, useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

import { Typography, Layout } from '../../atoms';

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  collaseLabel: {
    color: '#0f6ab4',
  },
});

type Props = {
  title: string;
};

export const CollapsableBlock: React.FC<Props> = ({ title, children }) => {
  const [open, setOpenState] = useState(false);
  const toggle = useCallback(() => {
    setOpenState((state) => !state);
  }, []);
  return (
    <Layout.Cal spacing={{ top: 2, bottom: 2 }}>
      <TouchableOpacity style={styles.header} onPress={toggle}>
        <Typography variant="h6">{title}</Typography>
        <Typography variant="body1" style={styles.collaseLabel}>
          {!open ? 'Развернуть' : 'Свернуть'}
        </Typography>
      </TouchableOpacity>
      {open && children}
    </Layout.Cal>
  );
};
