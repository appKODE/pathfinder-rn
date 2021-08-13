import React from 'react';

import { usePathfinder } from '../../../../../pathfinder-react';
import { Layout, TextInput } from '../../../../ui/atoms';

export const MockServerForm: React.FC = () => {
  const { pathfinder, settings } = usePathfinder();
  return (
    <Layout.Cal>
      <TextInput
        value={settings.mockServer[settings.enviroment].domain}
        onChangeText={(domain) => {
          pathfinder.updateMockServerSettings((lastState) => ({
            ...lastState,
            domain,
          }));
        }}
        label="Mock server url"
        description={`Autosave enabled\nExample: http://127.0.0.1:3100`}
      />
    </Layout.Cal>
  );
};
