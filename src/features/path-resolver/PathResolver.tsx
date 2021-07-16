import React from 'react';

import type { SendCallback } from '../network/XHRInterceptor';
import XHRInterceptor from '../network/XHRInterceptor';
import { usePathfinder } from '../pathfinder-react';

export const PathResolver: React.FC = () => {
  const { pathfinder } = usePathfinder();
  React.useEffect(() => {
    const interceptor: SendCallback = (apiCall) => {
      const url = pathfinder.getUrl(
        apiCall.url,
        apiCall.method.toLowerCase() as any
      );
      console.log({ original: apiCall.url, resolved: url });
      return {
        method: apiCall.method,
        url,
      };
    };

    XHRInterceptor.add(interceptor);
    return () => {
      XHRInterceptor.remove(interceptor);
    };
  }, [pathfinder]);

  return null;
};
