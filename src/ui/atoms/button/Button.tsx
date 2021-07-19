import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
  Text,
} from 'react-native';

const styles = StyleSheet.create({
  root: {
    backgroundColor: '#e7f0f7',
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
    tintColor: '#0f6ab4',
    transform: [{ rotate: '45deg' }],
  },
  primary: {
    backgroundColor: '#e7f0f7',
  },
  danger: {
    backgroundColor: '#f5e8e8',
  },
  title: {
    backgroundColor: '#f5e8e8',
  },
  dangerText: {
    color: '#a41e22',
  },
  primaryText: {
    color: '#0f6ab4',
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
