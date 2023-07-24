import React from 'react';
import {
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';

import { Typography } from '../../atoms';
import { theme } from '../../theme';

type TChipProps = {
  title: string;
  selected: boolean;
  style?: StyleProp<ViewStyle>;
  onPress: () => void;
};

export const Chip = ({ style, title, selected, onPress }: TChipProps) => {
  return (
    <TouchableOpacity
      style={[styles.root, selected && styles.selected, style]}
      onPress={onPress}
    >
      <Typography color={selected ? 'inactive' : 'primary'}>{title}</Typography>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: '#dedede',
    borderRadius: 5,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  selected: {
    backgroundColor: theme.colors.foreground.primary,
  },
});
