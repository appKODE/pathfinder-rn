import React, { useCallback, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

import { MethodBadge, Layout } from '../../../../ui/atoms';
import type { PathItemObject } from '../../../../OpenApi';
import { ApiDetails } from '../api-details/ApiDetails';
type Props = PathItemObject & {
  path: string;
};

const styles = StyleSheet.create({
  root: {
    paddingHorizontal: 15,
    paddingVertical: 5,
  },
  content: {
    paddingHorizontal: 10,
  },
});

const methods = ['get', 'post', 'put', 'delete'];

export const ApiListItem: React.FC<Props> = ({ path, ...props }) => {
  const [shownDetails, setShowDetails] = useState(false);
  const toggleDetails = useCallback(
    () => setShowDetails((shown) => !shown),
    []
  );
  return (
    <>
      {methods
        .filter((method) => Boolean(props[method]))
        .map((method) => {
          return (
            <Layout.Cal key={method + path} style={styles.root}>
              <TouchableOpacity onPress={toggleDetails}>
                <Layout.Row alignItems="center">
                  <MethodBadge>{method}</MethodBadge>
                  <Layout.Cal style={styles.content}>
                    <Text>{path}</Text>
                  </Layout.Cal>
                </Layout.Row>
              </TouchableOpacity>
              {shownDetails && (
                <ApiDetails method={method} path={path} {...props[method]} />
              )}
            </Layout.Cal>
          );
        })}
    </>
  );
};
