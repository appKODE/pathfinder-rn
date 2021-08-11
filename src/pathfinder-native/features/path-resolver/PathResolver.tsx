import React from 'react';

import type { SendCallback } from '../network/XHRInterceptor';
import XHRInterceptor from '../network/XHRInterceptor';
import { usePathfinder } from '../../../pathfinder-react';

export const PathResolver: React.FC<{ devMode?: boolean }> = ({ devMode }) => {
  const { pathfinder } = usePathfinder();
  React.useEffect(() => {
    const interceptor: SendCallback = (apiCall) => {
      const method = apiCall.method.toLowerCase() as any;

      const { url, headers } = pathfinder.resolve({
        ...apiCall,
        method,
      });

      if (devMode) {
        console.log('Pathfinder - send request:', {
          from: apiCall,
          to: { url, headers, method: apiCall.method },
        });
      }

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
  }, [pathfinder, devMode]);

  return null;
};
