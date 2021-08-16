import React from 'react';
import { usePathfinder } from '../../../pathfinder-react';

import { SegmentControl } from '../../ui/molecules';

export const EnvironmentSelector: React.FC = () => {
  const { pathfinder, settings, environments } = usePathfinder();

  if (environments.length <= 1) {
    return null;
  }

  return (
    <SegmentControl
      segments={environments.map((env) => ({
        title: env.name,
        value: env.name,
      }))}
      value={settings.environment || ''}
      onChange={(environment) => pathfinder.setEnvironment(environment)}
    />
  );
};
