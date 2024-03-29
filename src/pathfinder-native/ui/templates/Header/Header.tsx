import React from 'react';
import { View, StyleSheet, Text, Platform, StatusBar } from 'react-native';
import { theme } from '../../theme';

type Props = {
  right?: React.ReactNode;
  left?: React.ReactNode;
  title: string;
};

const styles = StyleSheet.create({
  right: {
    position: 'absolute',
    right: 12,
    height: 48,
    justifyContent: 'center',
  },
  left: {
    position: 'absolute',
    left: 12,
    height: 48,
    justifyContent: 'center',
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 50,
  },
  root: {
    justifyContent: 'flex-end',
    height: 48,
    width: '100%',
    marginTop: Platform.select({
      android: StatusBar.currentHeight,
      default: 0,
    }),
  },
  title: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
    color: theme.colors.foreground.default,
  },
});

export const Header: React.FC<Props> = ({ right, left, title }) => {
  return (
    <View style={styles.root}>
      <View style={styles.center}>
        <Text style={styles.title}>{title}</Text>
      </View>
      <View style={styles.left}>{left}</View>
      <View style={styles.right}>{right}</View>
    </View>
  );
};
