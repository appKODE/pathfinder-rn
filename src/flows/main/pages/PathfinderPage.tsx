import React from 'react';
import { FlatList } from 'react-native';

import { apiResolver } from '../../../features/apiResolver';
import XHRInterceptor, {
  SendCallback,
} from '../../../features/network/XHRInterceptor';
import { useApiCallsState } from '../hooks/useApiCallsState';
import { PathfinderTemplate } from '../templates/PathfinderTemplate';
import { ApiListItem } from '../organisms';

export const PathfinderPage: React.FC = () => {
  const [calls, { addApiCall }] = useApiCallsState();

  React.useEffect(() => {
    const interceptor: SendCallback = (apiCall) => {
      addApiCall(apiCall);
      return apiResolver.resolve(apiCall);
    };

    XHRInterceptor.add(interceptor);
    return () => {
      XHRInterceptor.remove(interceptor);
    };
  }, [addApiCall]);

  return (
    <PathfinderTemplate>
      <FlatList
        data={calls}
        renderItem={({ item }) => <ApiListItem {...item} />}
        keyExtractor={(item) => item.method + item.url}
      />
    </PathfinderTemplate>
  );
};
