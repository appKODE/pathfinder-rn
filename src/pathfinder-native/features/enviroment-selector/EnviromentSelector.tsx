import React from 'react';
import { usePathfinder } from '../../../pathfinder-react';

import { SegmentControl } from '../../ui/molecules';

export const EnviromentSelector: React.FC = () => {
  const { pathfinder, settings, enviroments } = usePathfinder();

  if (enviroments.length <= 1) {
    return null;
  }

  return (
    <SegmentControl
      segments={enviroments.map((env) => ({
        title: env.name,
        value: env.name,
      }))}
      value={settings.enviroment || ''}
      onChange={(enviroment) => pathfinder.setEnviroment(enviroment)}
    />
  );
};
