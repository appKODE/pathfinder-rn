import React from 'react';
import type { TouchableOpacityProps } from 'react-native';

import { Button, Icon } from '../../atoms';

export const AddButton: React.FC<TouchableOpacityProps> = (props) => {
  return (
    <Button {...props}>
      <Icon icon="close" size={25} rotate={45} color="primary" />
    </Button>
  );
};
