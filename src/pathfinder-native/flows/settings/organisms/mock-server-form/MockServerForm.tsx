import React from 'react';

import { usePathfinder } from '../../../../../pathfinder-react';
import { Layout, TextInput } from '../../../../ui/atoms';

export const MockServerForm: React.FC = () => {
  const pathfinder = usePathfinder();
  return (
    <Layout.Cal>
      <TextInput
        value={pathfinder.settings.mockServer?.domain}
        onChangeText={() => {}}
      />
    </Layout.Cal>
  );
};
