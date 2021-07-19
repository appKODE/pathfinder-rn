import React from 'react';
import { StyleSheet } from 'react-native';

import type { ParameterObject } from '../../../../features/pathfinder';
import { Layout, TextInput } from '../../../../ui/atoms';

const styles = StyleSheet.create({
  root: {
    marginTop: 5,
  },
});

export const Parameter: React.FC<{
  path: string;
  method: string;
  parameterInfo: ParameterObject;
  value?: string;
  onChange?: (value: string) => void;
}> = ({ parameterInfo, value, onChange }) => {
  const { description, required, name } = parameterInfo;
  const label = `${name}${required ? ' (обязательно)' : ''}`;
  return (
    <Layout.Cal style={styles.root}>
      <Layout.Row>
        <TextInput
          value={value}
          label={label}
          onChangeText={onChange}
          description={description}
          placeholder="Введите значение..."
        />
      </Layout.Row>
    </Layout.Cal>
  );
};
