import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { theme } from '../../theme';

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
    backgroundColor: theme.colors.foreground.info,
  },
  post: {
    backgroundColor: theme.colors.foreground.success,
  },
  put: {
    backgroundColor: theme.colors.foreground.warn,
  },
  delete: {
    backgroundColor: theme.colors.foreground.danger,
  },
});

type Props = {
  method: 'get' | 'post' | 'delete' | 'put';
};

export const MethodBadge: React.FC<Props> = ({ children, method }) => {
  return (
    <Text style={[styles.common, styles[method]]} allowFontScaling={false}>
      {children}
    </Text>
  );
};
