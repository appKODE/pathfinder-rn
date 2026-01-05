import React, { useState, type PropsWithChildren } from 'react';
import { StyleSheet, View } from 'react-native';

import { TabBar, type TTabBarProps } from './TabBar';
import { theme } from '../../../ui/theme';

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  route: {
    flex: 1,
    backgroundColor: theme.colors.background.default,
    ...StyleSheet.absoluteFillObject,
  },
});

export type TTabsProps = PropsWithChildren<Partial<TTabBarProps>>;

export const Tabs = ({ children, ...tabBarProps }: TTabsProps) => {
  const routes: any[] =
    React.Children.map(children, (child: any) => ({
      label: child.props.label,
      icon: child.props.icon,
      routeName: child.props.routeName,
      onPress: (routeName: string) => setRoute(routeName),
    })) || [];

  const [selectedRoute, setRoute] = useState<string>(
    routes?.length ? routes[0].routeName : ''
  );

  return (
    <View style={styles.root}>
      <View style={styles.container}>
        {React.Children.toArray(children).map((child: any) => {
          const routeName = child.props.routeName;
          const isActive = routeName === selectedRoute;
          return (
            <View
              key={routeName}
              style={[styles.route, { zIndex: isActive ? 1 : 0 }]}
            >
              {child}
            </View>
          );
        })}
      </View>
      <TabBar {...tabBarProps} routes={routes} currentRoute={selectedRoute} />
    </View>
  );
};
