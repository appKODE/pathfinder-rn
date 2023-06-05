import React, { useCallback, useRef } from 'react';
import {
  StyleSheet,
  Animated,
  useWindowDimensions,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StatusBar as StatusBarBase,
  StatusBarProps,
} from 'react-native';

import { Control } from './ui/atoms/control/Control';
import { IconButton } from './ui/molecules';
import { Page, Header } from './ui/templates';
import { AppNavigator } from './navigator';

const styles = StyleSheet.create({
  root: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: 1000,
  },
  content: {
    flex: 1,
  },
});

type TStatusBar = {
  popStackEntry: (props: StatusBarProps) => null;
  pushStackEntry: (props: StatusBarProps) => StatusBarProps;
};

const StatusBar: TStatusBar = Platform.select({
  android: StatusBarBase as any,
  default: {
    popStackEntry: () => null,
    pushStackEntry: () => ({}),
  },
});

export const App = () => {
  const { width } = useWindowDimensions();
  const slideX = useRef(new Animated.Value(-width)).current;
  const statusBarProps = useRef({});
  React.useEffect(() => {
    slideX.setValue(-width);
  }, [width, slideX]);

  const onClose = useCallback(() => {
    StatusBar.popStackEntry(statusBarProps.current);
    Keyboard.dismiss();
    Animated.timing(slideX, {
      toValue: -width,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [slideX, width]);
  const opacity = slideX.interpolate({
    inputRange: [-width + 50, -width + 80],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });
  return (
    <>
      <Animated.View style={[styles.root, { right: slideX, opacity }]}>
        <KeyboardAvoidingView
          style={styles.content}
          enabled={Platform.OS === 'ios'}
          behavior="padding"
        >
          <Page>
            <Header
              title="Pathfinder"
              right={<IconButton onPress={onClose} icon="close" />}
            />
            <AppNavigator />
          </Page>
        </KeyboardAvoidingView>
      </Animated.View>
      <Control
        slideX={slideX}
        sliderStartPosition={-width}
        onOpen={() => {
          statusBarProps.current = StatusBar.pushStackEntry({
            animated: true,
            translucent: true,
          });
        }}
      />
    </>
  );
};
