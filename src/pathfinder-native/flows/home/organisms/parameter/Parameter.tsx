import React, { useCallback } from 'react';
import { Alert, StyleSheet } from 'react-native';

import type { ParameterObject } from '../../../../../pathfinder';
import { Layout, TextInput } from '../../../../ui/atoms';
import { IconButton } from '../../../../ui/molecules';

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
  withDelete: boolean;
  onChange?: (value: string) => void;
  onDelete: () => void;
}> = ({ parameterInfo, value, withDelete, onChange, onDelete }) => {
  const { description, required, name } = parameterInfo;
  const label = `${name}${required ? ' (required)' : ''}`;

  const confirmDelete = useCallback(() => {
    Alert.alert('Подтвердите действие', 'Удалить элемент?', [
      { text: 'Удалить', onPress: () => onDelete(), style: 'destructive' },
      { text: 'Отмена' },
    ]);
  }, [onDelete]);

  return (
    <Layout.Cal style={styles.root}>
      <Layout.Row alignItems="center">
        <TextInput
          value={value}
          label={label}
          onChangeText={onChange}
          description={description}
          placeholder="Enter value..."
        />
        {withDelete && (
          <Layout.Cal spacing={{ left: 2 }}>
            <IconButton icon="delete" onPress={confirmDelete} color="danger" />
          </Layout.Cal>
        )}
      </Layout.Row>
    </Layout.Cal>
  );
};
