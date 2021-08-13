import React, { useCallback, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { AddButton } from '../../../../ui/molecules';
import { Button, TextInput, Typography, Layout } from '../../../../ui/atoms';

const styles = StyleSheet.create({
  root: {
    backgroundColor: '#fafafa',
    borderRadius: 10,
    padding: 10,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
});

type Props = {
  onSubmit: (name: string, value: string) => void;
};

export const AddParamForm: React.FC<Props> = ({ onSubmit }) => {
  const [visible, setVisibleState] = useState(false);
  const [name, setName] = useState('');
  const [value, setValue] = useState('');

  const cancel = useCallback(() => {
    setName('');
    setValue('');
    setVisibleState(false);
  }, []);

  const submit = useCallback(() => {
    onSubmit(name, value);
    cancel();
  }, [onSubmit, name, value, cancel]);

  return (
    <>
      {!visible && <AddButton onPress={() => setVisibleState(true)} />}
      {visible && (
        <View style={styles.root}>
          <Typography variant={'h5'} textAlign="center">
            Create new parameter
          </Typography>
          <TextInput
            label={'Name'}
            value={name}
            onChangeText={setName}
            autoFocus
          />
          <TextInput label={'Value'} value={value} onChangeText={setValue} />
          <View style={styles.footer}>
            <Button onPress={submit}>Create</Button>
            <Layout.Cal spacing={1} />
            <Button color="danger" onPress={cancel}>
              Cancel
            </Button>
          </View>
        </View>
      )}
    </>
  );
};
