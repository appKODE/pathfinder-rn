import { Switch as Base, type SwitchProps } from 'react-native';

type TSwitchProps = SwitchProps;

export const Switch = (props: TSwitchProps) => {
  return <Base {...props} />;
};
