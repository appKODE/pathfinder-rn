import React from 'react';
import { Switch as Base, SwitchProps } from 'react-native';

type TSwitchProps = SwitchProps;

export const Switch = (props: TSwitchProps) => {
  return <Base {...props} />;
};
