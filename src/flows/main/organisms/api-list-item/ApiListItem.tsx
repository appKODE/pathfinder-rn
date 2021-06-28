import React, { useCallback, useMemo, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

import { MethodBadge, Layout } from '../../../../ui/atoms';
import { parseURL } from '../../../../utils';
import { ApiDetails } from '../api-details/ApiDetails';

type Props = {
  url: string;
  method: string;
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

export const ApiListItem: React.FC<Props> = ({ url, method }) => {
  const [shownDetails, setShowDetails] = useState(false);
  const { pathname, origin } = useMemo(() => {
    return parseURL(url);
  }, [url]);
  const toggleDetails = useCallback(
    () => setShowDetails((shown) => !shown),
    []
  );
  return (
    <Layout.Cal style={styles.root}>
      <TouchableOpacity onPress={toggleDetails}>
        <Layout.Row alignItems="center">
          <MethodBadge>{method}</MethodBadge>
          <Layout.Cal style={styles.content}>
            <Text>{pathname}</Text>
          </Layout.Cal>
        </Layout.Row>
      </TouchableOpacity>
      {shownDetails && <ApiDetails pathname={pathname} origin={origin} />}
    </Layout.Cal>
  );
};
