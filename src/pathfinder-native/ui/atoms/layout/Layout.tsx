import React from 'react';
import { StyleSheet, View, ViewProps, ViewStyle } from 'react-native';

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
  cal: {
    flexDirection: 'column',
  },
});

type TSpacing =
  | number
  | { top?: number; right?: number; bottom?: number; left?: number };

type RowProps = ViewProps & {
  alignItems?: ViewStyle['alignItems'];
  justifyContent?: ViewStyle['justifyContent'];
  spacing?: TSpacing;
  flex?: number;
};

const getPaddings = (spacing?: TSpacing) => {
  if (!spacing) {
    return undefined;
  }

  if (typeof spacing === 'number') {
    return {
      padding: spacing * 8,
    };
  }

  return {
    paddingLeft: (spacing.left || 0) * 8,
    paddingRight: (spacing.right || 0) * 8,
    paddingTop: (spacing.top || 0) * 8,
    paddingBottom: (spacing.bottom || 0) * 8,
  };
};

const Row: React.FC<RowProps> = ({
  alignItems,
  justifyContent,
  spacing,
  flex,
  ...props
}) => (
  <View
    {...props}
    style={[
      styles.row,
      { alignItems, justifyContent, flex },
      getPaddings(spacing),
      props.style,
    ]}
  />
);

const Cal: React.FC<RowProps> = ({
  alignItems,
  justifyContent,
  spacing,
  flex,
  ...props
}) => (
  <View
    {...props}
    style={[
      styles.cal,
      { alignItems, justifyContent, flex },
      getPaddings(spacing),
      props.style,
    ]}
  />
);

export const Layout = {
  Row,
  Cal,
};
