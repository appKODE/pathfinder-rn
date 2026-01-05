import React from 'react';
import { Text, StyleSheet, type TextStyle, type TextProps } from 'react-native';
import { theme } from '../../theme';

type TFontType =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'body1'
  | 'body2'
  | 'caption';

const styles = StyleSheet.create({
  h1: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  h2: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  h3: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  h4: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  h5: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  h6: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  body1: {
    fontSize: 14,
  },
  body2: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 12,
  },
  common: {
    color: theme.colors.foreground.default,
  },
});

export type TTypographyProps = TextProps & {
  variant?: TFontType;
  textAlign?: TextStyle['textAlign'];
  color?: keyof typeof theme.colors.foreground;
};

export const Typography: React.FC<TTypographyProps> = ({
  children,
  variant,
  textAlign = 'left',
  color,
  ...props
}) => {
  return (
    <Text
      {...props}
      allowFontScaling={false}
      style={[
        styles.common,
        variant && styles[variant],
        { textAlign },
        color && { color: theme.colors.foreground[color] },
        props.style,
      ]}
    >
      {children}
    </Text>
  );
};
