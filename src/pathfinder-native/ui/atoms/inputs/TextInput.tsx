import React from 'react';
import {
  StyleSheet,
  TextInput as TextInputBase,
  TextInputProps,
  View,
  Text,
} from 'react-native';

type Props = TextInputProps & {
  label?: string;
  description?: string;
};

const styles = StyleSheet.create({
  root: {
    paddingVertical: 4,
    flexGrow: 1,
  },
  label: {
    fontSize: 12,
    fontWeight: 'bold',
    color: 'gray',
  },
  description: {
    fontSize: 12,
    color: 'gray',
    marginBottom: 5,
    marginTop: 3,
  },
  input: {
    height: 34,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'gray',
    margin: 0,
    padding: 0,
    width: '100%',
  },
});

export const TextInput: React.FC<Props> = ({
  label,
  description,
  ...inputProps
}) => {
  return (
    <View style={styles.root}>
      <Text style={styles.label}>{label}</Text>
      <TextInputBase {...inputProps} style={[styles.input, inputProps.style]} />
      <Text style={styles.description}>{description}</Text>
    </View>
  );
};
