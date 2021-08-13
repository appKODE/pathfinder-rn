import React from 'react';
import { Image, ImageProps, StyleSheet } from 'react-native';

import { Assets } from '../../../assets';
import { theme } from '../../theme';

const styles = StyleSheet.create({
  icon: {
    resizeMode: 'contain',
    width: 22,
    height: 22,
    tintColor: theme.colors.foreground.default,
  },
});

export type TIconProps = Partial<ImageProps> & {
  icon: keyof typeof Assets.icons;
  size?: number;
  rotate?: number;
  color?: keyof typeof theme.colors.foreground;
};

export const Icon: React.FC<TIconProps> = ({
  icon,
  size,
  rotate,
  color,
  ...props
}) => {
  return (
    <Image
      {...props}
      source={Assets.icons[icon]}
      style={[
        styles.icon,
        size !== undefined && { width: size, height: size },
        rotate !== undefined && { transform: [{ rotate: `${rotate}deg` }] },
        color !== undefined && { tintColor: theme.colors.foreground[color] },
        props.style,
      ]}
    />
  );
};
