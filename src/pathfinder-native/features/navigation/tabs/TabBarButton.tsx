import React from 'react';
import {
  ImageSourcePropType,
  StyleSheet,
  TouchableOpacity,
  Image,
  Text,
} from 'react-native';

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    resizeMode: 'contain',
    width: 24,
    height: 24,
    tintColor: '#686868',
  },
  label: {
    fontSize: 12,
    textAlign: 'center',
    color: '#686868',
    marginTop: 2,
  },
  labelFocused: {
    color: '#0f6ab4',
  },
  iconFocused: {
    tintColor: '#0f6ab4',
  },
});

export type TTabBarButtonProps = {
  label: string;
  icon: ImageSourcePropType;
  routeName: string;
  focused?: boolean;
  onPress: (routeName: string) => void;
};

export const TabBarButton: React.FC<TTabBarButtonProps> = ({
  icon,
  label,
  routeName,
  focused,
  onPress,
}) => {
  return (
    <TouchableOpacity style={styles.root} onPress={() => onPress(routeName)}>
      <Image
        source={icon}
        style={[styles.icon, focused && styles.iconFocused]}
      />
      <Text
        style={[styles.label, focused && styles.labelFocused]}
        allowFontScaling={false}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
};
