import React from 'react';

import type { SendCallback } from '../network/XHRInterceptor';
import XHRInterceptor from '../network/XHRInterceptor';
import { usePathfinder } from '../../../pathfinder-react';

export const PathResolver: React.FC = () => {
  const { pathfinder } = usePathfinder();
  React.useEffect(() => {
    const interceptor: SendCallback = (apiCall) => {
      const { url, headers } = pathfinder.resolve({
        ...apiCall,
        method: apiCall.method.toLowerCase() as any,
      });

      return {
        method: apiCall.method,
        url,
        headers,
      };
    };

    XHRInterceptor.add(interceptor);
    return () => {
      XHRInterceptor.remove(interceptor);
    };
  }, [pathfinder]);

  return null;
};
