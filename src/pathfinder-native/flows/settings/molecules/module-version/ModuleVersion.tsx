import React from 'react';

import { Typography } from '../../../../ui/atoms';
import appManifest from '../../../../../../package.json';

export const ModuleVersion: React.FC = () => {
  return (
    <Typography variant="caption" color="inactive" textAlign="center">
      version: {appManifest.version}
    </Typography>
  );
};
