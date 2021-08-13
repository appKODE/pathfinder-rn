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
});

export type TTabBarButtonProps = {
  label: string;
  icon: ImageSourcePropType;
  routeName: string;
  focused?: boolean;
  activeColor?: string;
  inactiveColor?: string;
  onPress: (routeName: string) => void;
};

export const TabBarButton: React.FC<TTabBarButtonProps> = ({
  icon,
  label,
  routeName,
  focused,
  activeColor,
  inactiveColor,
  onPress,
}) => {
  return (
    <TouchableOpacity style={styles.root} onPress={() => onPress(routeName)}>
      <Image
        source={icon}
        style={[
          styles.icon,
          !!inactiveColor && { tintColor: inactiveColor },
          focused && !!activeColor && { tintColor: activeColor },
        ]}
      />
      <Text
        style={[
          styles.label,
          !!inactiveColor && { color: inactiveColor },
          focused && !!activeColor && { color: activeColor },
        ]}
        allowFontScaling={false}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
};
