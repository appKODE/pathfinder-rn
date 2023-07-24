import React, { useCallback, useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

import { Typography, Layout } from '../../atoms';
import { Icon } from '../../atoms';

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
});

type Props = {
  title: string;
  initialState?: boolean;
};

export const CollapsableBlock: React.FC<Props> = ({
  title,
  children,
  initialState,
}) => {
  const [open, setOpenState] = useState(Boolean(initialState));
  const toggle = useCallback(() => {
    setOpenState((state) => !state);
  }, []);
  return (
    <Layout.Cal spacing={{ top: 2, bottom: 2 }}>
      <TouchableOpacity
        style={styles.header}
        onPress={toggle}
        hitSlop={{ top: 5, bottom: 5 }}
      >
        <Typography variant="h6">{title}</Typography>
        <Icon icon="arrow" rotate={!open ? 0 : 180} size={14} color="primary" />
      </TouchableOpacity>
      {open && (
        <Layout.Cal spacing={{ top: 2, bottom: 2 }}>{children}</Layout.Cal>
      )}
    </Layout.Cal>
  );
};
