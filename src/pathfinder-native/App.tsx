import React, { useCallback, useRef } from 'react';
import { StyleSheet, Animated, useWindowDimensions } from 'react-native';

import { Control } from './ui/atoms/control/Control';
import { CloseButton } from './ui/molecules';
import { Page, Header } from './ui/templates';
import { AppNavigator } from './navigator';

const styles = StyleSheet.create({
  root: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: 1000,
  },
});

export const App: React.FC = () => {
  const { width } = useWindowDimensions();
  const slideX = useRef(new Animated.Value(-width)).current;

  React.useEffect(() => {
    slideX.setValue(-width);
  }, [width, slideX]);

  const onClose = useCallback(() => {
    Animated.timing(slideX, {
      toValue: -width,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [slideX, width]);
  return (
    <>
      <Animated.View style={[styles.root, { right: slideX }]}>
        <Page>
          <Header
            title="Pathfinder"
            right={<CloseButton onPress={onClose} />}
          />
          <AppNavigator />
        </Page>
      </Animated.View>
      <Control slideX={slideX} sliderStartPosition={-width} />
    </>
  );
};