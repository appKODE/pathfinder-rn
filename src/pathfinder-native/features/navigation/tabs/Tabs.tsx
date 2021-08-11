import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { TabBar } from './TabBar';

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
});

export const Tabs: React.FC = ({ children }) => {
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
        {React.Children.toArray(children).filter(
          (child: any) => child.props.routeName === selectedRoute
        )}
      </View>
      <TabBar routes={routes} currentRoute={selectedRoute} />
    </View>
  );
};
