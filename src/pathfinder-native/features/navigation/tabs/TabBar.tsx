import React from 'react';
import { View, StyleSheet } from 'react-native';
import { TabBarButton, type TTabBarButtonProps } from './TabBarButton';

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    height: 48,
    borderTopColor: '#cfcfcf',
    borderTopWidth: StyleSheet.hairlineWidth,
  },
});

export type TTabBarProps = Pick<
  TTabBarButtonProps,
  'activeColor' | 'inactiveColor'
> & {
  routes: TTabBarButtonProps[];
  currentRoute: string;
};

export const TabBar: React.FC<TTabBarProps> = ({
  routes,
  currentRoute,
  ...tabBarButtonProps
}) => {
  return (
    <View style={styles.root}>
      {routes.map((route) => {
        return (
          <TabBarButton
            key={route.routeName}
            focused={currentRoute === route.routeName}
            {...tabBarButtonProps}
            {...route}
          />
        );
      })}
    </View>
  );
};
