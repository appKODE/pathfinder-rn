import React, { useMemo } from 'react';
import { usePathfinder } from '../../../pathfinder-react';

import { SegmentControl } from '../../ui/molecules';

export const EnvironmentSelector = () => {
  const { environment, environments, setEnvironment } = usePathfinder();

  const segments = useMemo(() => {
    return environments.map((env) => ({
      title: env,
      value: env,
    }));
  }, [environments]);

  if (segments.length <= 1) {
    return null;
  }

  return (
    <SegmentControl
      segments={segments}
      value={environment || ''}
      onChange={setEnvironment}
    />
  );
};
