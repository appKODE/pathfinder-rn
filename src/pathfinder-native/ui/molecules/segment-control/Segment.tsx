import React from 'react';
import { StyleSheet, TouchableOpacity, Text, Dimensions } from 'react-native';
const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  root: {
    paddingHorizontal: 5,
    paddingVertical: 5,
    justifyContent: 'center',
    alignItems: 'center',
    width: width / 4,
  },
  focused: {
    backgroundColor: 'white',
    elevation: 2,
    shadowColor: 'black',
    shadowOpacity: 0.2,
    shadowRadius: 3,
    borderRadius: 6,
    shadowOffset: { width: 2, height: 2 },
  },
});

type Props = {
  title: string;
  focused: boolean;
  onPress: () => void;
};

export const Segment: React.FC<Props> = ({ title, focused, onPress }) => {
  return (
    <TouchableOpacity
      style={[styles.root, focused && styles.focused]}
      onPress={onPress}
    >
      <Text allowFontScaling={false} numberOfLines={1}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};
