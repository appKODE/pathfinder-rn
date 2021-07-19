import React, { useCallback, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

const styles = StyleSheet.create({
  root: {
    marginVertical: 10,
  },
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
    <View style={styles.root}>
      <TouchableOpacity style={styles.header} onPress={toggle}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.collaseLabel}>
          {!open ? 'Развернуть' : 'Свернуть'}
        </Text>
      </TouchableOpacity>
      {open && children}
    </View>
  );
};
