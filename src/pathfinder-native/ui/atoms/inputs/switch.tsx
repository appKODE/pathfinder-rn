import React from 'react';
import { Switch as Base, SwitchProps } from 'react-native';
import { theme } from '../../theme';

type TSwitchProps = SwitchProps;

export const Switch = (props: TSwitchProps) => {
  return (
    <Base
      {...props}
      trackColor={{
        false: theme.colors.background.info,
        true: theme.colors.background.info,
      }}
    />
  );
};
