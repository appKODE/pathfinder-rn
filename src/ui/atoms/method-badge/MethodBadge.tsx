import React from 'react';
import { StyleSheet, Text } from 'react-native';

const styles = StyleSheet.create({
  common: {
    backgroundColor: 'blue',
    borderRadius: 5,
    paddingVertical: 4,
    color: 'white',
    overflow: 'hidden',
    fontSize: 12,
    width: 40,
    textAlign: 'center',
  },
});

export const MethodBadge: React.FC = ({ children }) => {
  return <Text style={styles.common}>{children}</Text>;
};
