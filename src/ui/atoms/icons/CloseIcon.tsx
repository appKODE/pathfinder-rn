import React from 'react';
import { Image, StyleSheet } from 'react-native';

import { Assets } from '../../../../src/assets';

const styles = StyleSheet.create({
  icon: {
    resizeMode: 'contain',
    width: 22,
    height: 22,
    tintColor: 'rgb(43, 43, 43)',
  },
});

export const CloseIcon: React.FC = () => {
  return <Image source={Assets.icons.close} style={styles.icon} />;
};
