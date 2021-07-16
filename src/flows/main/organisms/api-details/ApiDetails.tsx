import React from 'react';
import { Switch, Text } from 'react-native';
import { usePathfinder } from '../../../../features/pathfinder-react';
import type { OperationObject } from 'src/OpenApi';

import { Layout } from '../../../../ui/atoms';

type Props = OperationObject & {
  method: 'get' | 'post' | 'put' | 'delete';
};

export const ApiDetails: React.FC<Props> = ({ path, method }) => {
  const { settings, pathfinder } = usePathfinder();
  const template = settings?.paths[path];
  const enabled = Boolean(template?.[method]?.enabledMock);
  return (
    <Layout.Cal>
      {/* {tags && <Text>Tags: {tags.join(', ')}</Text>}
      {parameters && (
        <Text>
          Parameters: {'\n'} {JSON.stringify(parameters, null, 2)}
        </Text>
      )} */}
      <Layout.Row>
        <Text>Mock</Text>
        <Switch
          onValueChange={(enabledMock) =>
            pathfinder.setTemplateSettings(path, method, {
              enabledMock,
            })
          }
          value={enabled}
        />
      </Layout.Row>
    </Layout.Cal>
  );
};
