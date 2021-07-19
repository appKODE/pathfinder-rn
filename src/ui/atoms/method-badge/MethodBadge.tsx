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
  get: {
    backgroundColor: '#0f6ab4',
  },
  post: {
    backgroundColor: '#10a54a',
  },
  put: {
    backgroundColor: '#c5862b',
  },
  delete: {
    backgroundColor: '#a41e22',
  },
});

type Props = {
  method: 'get' | 'post' | 'delete' | 'put';
};

export const MethodBadge: React.FC<Props> = ({ children, method }) => {
  return <Text style={[styles.common, styles[method]]}>{children}</Text>;
};
