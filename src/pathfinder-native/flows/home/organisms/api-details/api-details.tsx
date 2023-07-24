import React from 'react';
import { StyleSheet } from 'react-native';

import { usePathfinder } from '../../../../../pathfinder-react';
import type {
  OperationObject,
  ParameterObject,
} from '../../../../../pathfinder';
import { Layout, Switch, Typography } from '../../../../ui/atoms';
import { CollapsableBlock } from '../../../../ui/organisms';
import { Parameter } from '../parameter/Parameter';
import { AddParamForm } from '../add-param-form/AddParamForm';
import { unionParameters } from '../../utils';
import { ExampleSelector } from '../../molecules';

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
  responses,
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
        const index = parameters.findIndex(
          (parameter) => parameter.in === type && parameter.name === name
        );

        if (index !== -1) {
          parameters[index].value = value;
        } else {
          parameters.push({
            in: type,
            name,
            value,
          });
        }

        return {
          ...lastState,
          parameters,
        };
      });
    };

  const onDelete = (type: ParameterObject['in'], name: string) => () => {
    pathfinder.updateTemplateSettings(path, method, (lastState) => {
      const parameters = [...(lastState.parameters || [])];
      const index = parameters.findIndex(
        (parameter) => parameter.in === type && parameter.name === name
      );

      if (index !== -1) {
        parameters.splice(index, 1);
      }

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
        <Typography variant="body2">Interceptor enabled</Typography>
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
              enabled: !lastState.enabled && value ? true : lastState.enabled,
            }))
          }
          value={enabledMock}
        />
      </Layout.Row>
      <ExampleSelector
        responses={responses}
        headers={headers}
        onChange={onChangeValue('header', 'Prefer')}
      />
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
              onDelete={onDelete(header.in, header.name)}
              withDelete={header.custom}
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
              onDelete={onDelete(pathParam.in, pathParam.name)}
              withDelete={pathParam.custom}
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
              onDelete={onDelete(queryParam.in, queryParam.name)}
              withDelete={queryParam.custom}
            />
          );
        })}
        <AddParamForm onSubmit={onSubmit('query')} />
      </CollapsableBlock>
    </Layout.Cal>
  );
};
