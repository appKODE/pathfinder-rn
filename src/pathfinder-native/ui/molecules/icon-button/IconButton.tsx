import React from 'react';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { Icon, TIconProps } from '../../atoms';

type Props = TouchableOpacityProps & TIconProps;

export const IconButton: React.FC<Props> = ({
  icon,
  rotate,
  size,
  color,
  ...props
}) => {
  return (
    <TouchableOpacity
      hitSlop={{ top: 5, right: 5, bottom: 5, left: 5 }}
      {...props}
    >
      <Icon icon={icon} rotate={rotate} size={size} color={color} />
    </TouchableOpacity>
  );
};
