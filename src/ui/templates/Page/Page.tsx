import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export const Page: React.FC = ({ children }) => {
  return <SafeAreaView style={styles.root}>{children}</SafeAreaView>;
};
