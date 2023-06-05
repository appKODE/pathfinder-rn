import React from 'react';

import { usePathfinder } from '../../../../../pathfinder-react';
import { Layout, TextInput } from '../../../../ui/atoms';

export const MockServerForm: React.FC = () => {
  const { pathfinder, settings } = usePathfinder();
  return (
    <Layout.Cal>
      {pathfinder.getSchemas().map(({ server, name }) => {
        if (!server) {
          return null;
        }
        return (
          <Layout.Cal key={name} spacing={{ bottom: 3 }}>
            <TextInput
              value={settings.servers[name]?.domain ?? server.domain}
              onChangeText={(domain) => {
                pathfinder.updateMockServerSettings(name, (lastState) => ({
                  ...lastState,
                  domain,
                }));
              }}
              label={`Mock server url for ${name}`}
              description={`Autosave enabled\nExample: http://127.0.0.1:3100`}
            />
          </Layout.Cal>
        );
      })}
    </Layout.Cal>
  );
};
