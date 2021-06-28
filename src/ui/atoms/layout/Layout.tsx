import React from 'react';
import { StyleSheet, View, ViewProps, ViewStyle } from 'react-native';

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
  cal: {
    flexDirection: 'column',
  },
});

type RowProps = ViewProps & {
  alignItems?: ViewStyle['alignItems'];
  justifyContent?: ViewStyle['justifyContent'];
};

const Row: React.FC<RowProps> = ({ alignItems, justifyContent, ...props }) => (
  <View
    {...props}
    style={[styles.row, { alignItems, justifyContent }, props.style]}
  />
);

const Cal: React.FC<RowProps> = ({ alignItems, justifyContent, ...props }) => (
  <View
    {...props}
    style={[styles.cal, { alignItems, justifyContent }, props.style]}
  />
);

export const Layout = {
  Row,
  Cal,
};
