import React from 'react';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { CloseIcon } from '../../atoms';

export const CloseButton: React.FC<TouchableOpacityProps> = (props) => {
  return (
    <TouchableOpacity {...props}>
      <CloseIcon />
    </TouchableOpacity>
  );
};
