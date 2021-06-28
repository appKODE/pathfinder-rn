import React from 'react';
import { Text } from 'react-native';

export const UrlPath: React.FC = ({ children }) => {
  if (typeof children !== 'string') {
    return null;
  }
  return <Text>{children}</Text>;
};
