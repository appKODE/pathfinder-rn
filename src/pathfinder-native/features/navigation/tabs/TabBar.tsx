import React from 'react';
import { View, StyleSheet } from 'react-native';
import { TabBarButton, TTabBarButtonProps } from './TabBarButton';

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    height: 48,
    borderTopColor: '#cfcfcf',
    borderTopWidth: StyleSheet.hairlineWidth,
  },
});

type Props = {
  routes: TTabBarButtonProps[];
  currentRoute: string;
};

export const TabBar: React.FC<Props> = ({ routes, currentRoute }) => {
  return (
    <View style={styles.root}>
      {routes.map((route) => {
        return (
          <TabBarButton
            key={route.routeName}
            focused={currentRoute === route.routeName}
            {...route}
          />
        );
      })}
    </View>
  );
};
