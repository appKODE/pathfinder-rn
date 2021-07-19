import React from 'react';
import { StyleSheet, Switch } from 'react-native';

import { usePathfinder } from '../../../../features/pathfinder-react';
import type {
  OperationObject,
  ParameterObject,
} from '../../../../features/pathfinder';
import { Layout, Typography } from '../../../../ui/atoms';
import { CollapsableBlock } from '../../../../ui/organisms';
import { Parameter } from '../parameter/Parameter';
import { AddParamForm } from '../add-param-form/AddParamForm';
import { unionParameters } from '../../utils';

type Props = OperationObject & {
  method: 'get' | 'post' | 'put' | 'delete';
};

const styles = StyleSheet.create({
  root: {
    marginVertical: 20,
  },
  mockInfo: {
    justifyContent: 'space-between',
    marginBottom: 15,
  },
});

export const ApiDetails: React.FC<Props> = ({
  path,
  method,
  parameters = [],
}) => {
  const { pathfinder } = usePathfinder();

  const onSubmit =
    (type: ParameterObject['in']) => (name: string, value: string) => {
      pathfinder.updateTemplateSettings(path, method, (lastState) => ({
        ...lastState,
        parameters: [
          ...(lastState.parameters || []),
          {
            in: type,
            name,
            value,
          },
        ],
      }));
    };

  const onChangeValue =
    (type: ParameterObject['in'], name: string) => (value: string) => {
      pathfinder.updateTemplateSettings(path, method, (lastState) => {
        const parameters = [...(lastState.parameters || [])];
        parameters.forEach((parameter) => {
          if (parameter.in === type && parameter.name === name) {
            parameter.value = value;
          }
        });
        return {
          ...lastState,
          parameters,
        };
      });
    };

  const settings = pathfinder.getSettings(path, method);
  const enabledMock = Boolean(settings?.enabledMock);
  const enabled = Boolean(settings?.enabled);

  const params = unionParameters(parameters, settings?.parameters || []);

  const pathParams = params.filter((parameter) => parameter.in === 'path');
  const headers = params.filter((parameter) => parameter.in === 'header');
  const queryParams = params.filter((parameter) => parameter.in === 'query');
  return (
    <Layout.Cal style={styles.root}>
      <Layout.Row style={styles.mockInfo} alignItems="center">
        <Typography variant="body2">Enabled</Typography>
        <Switch
          onValueChange={(value) =>
            pathfinder.updateTemplateSettings(path, method, (lastState) => ({
              ...lastState,
              enabled: value,
            }))
          }
          value={enabled}
        />
      </Layout.Row>
      <Layout.Row style={styles.mockInfo} alignItems="center">
        <Typography variant="body2">Use mock server</Typography>
        <Switch
          onValueChange={(value) =>
            pathfinder.updateTemplateSettings(path, method, (lastState) => ({
              ...lastState,
              enabledMock: value,
            }))
          }
          value={enabledMock}
        />
      </Layout.Row>
      <CollapsableBlock title="Headers">
        {headers.map((header) => {
          return (
            <Parameter
              key={header.name}
              parameterInfo={header}
              method={method}
              path={path}
              value={header.value}
              onChange={onChangeValue(header.in, header.name)}
            />
          );
        })}
        <AddParamForm onSubmit={onSubmit('header')} />
      </CollapsableBlock>
      <CollapsableBlock title="Path params">
        {pathParams.map((pathParam) => {
          return (
            <Parameter
              key={pathParam.name}
              parameterInfo={pathParam}
              method={method}
              path={path}
              value={pathParam.value}
              onChange={onChangeValue(pathParam.in, pathParam.name)}
            />
          );
        })}
        <AddParamForm onSubmit={onSubmit('path')} />
      </CollapsableBlock>
      <CollapsableBlock title="Query params">
        {queryParams.map((queryParam) => {
          return (
            <Parameter
              key={queryParam.name}
              parameterInfo={queryParam}
              method={method}
              path={path}
              value={queryParam.value}
              onChange={onChangeValue(queryParam.in, queryParam.name)}
            />
          );
        })}
        <AddParamForm onSubmit={onSubmit('query')} />
      </CollapsableBlock>
    </Layout.Cal>
  );
};
