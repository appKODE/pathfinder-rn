import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
  Text,
} from 'react-native';
import { theme } from '../../theme';

const styles = StyleSheet.create({
  root: {
    backgroundColor: theme.colors.background.info,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    height: 46,
    minWidth: 80,
    alignSelf: 'center',
  },
  icon: {
    width: 25,
    height: 25,
    tintColor: theme.colors.foreground.info,
    transform: [{ rotate: '45deg' }],
  },
  primary: {
    backgroundColor: theme.colors.background.info,
  },
  danger: {
    backgroundColor: theme.colors.background.danger,
  },
  dangerText: {
    color: theme.colors.foreground.danger,
  },
  primaryText: {
    color: theme.colors.foreground.info,
  },
});

export type TButtonProps = TouchableOpacityProps & {
  color?: 'danger' | 'primary';
};

export const Button: React.FC<TButtonProps> = ({
  children,
  color,
  ...props
}) => {
  return (
    <TouchableOpacity
      {...props}
      style={[styles.root, color && styles[color], props.style]}
    >
      {typeof children === 'string' ? (
        <Text
          style={[styles.primaryText, color === 'danger' && styles.dangerText]}
        >
          {children}
        </Text>
      ) : (
        children
      )}
    </TouchableOpacity>
  );
};
