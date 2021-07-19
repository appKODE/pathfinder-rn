import React, { useCallback, useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

import { MethodBadge, Layout, Typography } from '../../../../ui/atoms';
import type { PathItemObject } from '../../../../features/pathfinder';
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

type TMethod = 'get' | 'post' | 'put' | 'delete';

const methods: TMethod[] = ['get', 'post', 'put', 'delete'];

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
                  <MethodBadge method={method}>{method}</MethodBadge>
                  <Layout.Cal style={styles.content}>
                    <Typography variant="body1">{path}</Typography>
                  </Layout.Cal>
                </Layout.Row>
              </TouchableOpacity>
              {shownDetails && (
                <ApiDetails method={method} path={path} {...props[method]!} />
              )}
            </Layout.Cal>
          );
        })}
    </>
  );
};
