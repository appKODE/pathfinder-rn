import React from 'react';
import { TouchableOpacityProps, Image, StyleSheet } from 'react-native';

import { Button } from '../../atoms';
import { Assets } from '../../../assets';

const styles = StyleSheet.create({
  icon: {
    width: 25,
    height: 25,
    tintColor: '#0f6ab4',
    transform: [{ rotate: '45deg' }],
  },
});

export const AddButton: React.FC<TouchableOpacityProps> = (props) => {
  return (
    <Button {...props}>
      <Image source={Assets.icons.close} style={styles.icon} />
    </Button>
  );
};
