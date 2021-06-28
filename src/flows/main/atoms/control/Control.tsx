import React, { useMemo, useRef } from 'react';
import {
  StyleSheet,
  Animated,
  PanResponderInstance,
  PanResponder,
} from 'react-native';

const styles = StyleSheet.create({
  root: {
    position: 'absolute',
    right: 5,
    bottom: 50,
    height: 50,
    width: 5,
    backgroundColor: 'gray',
    borderRadius: 25,
    elevation: 5,
    shadowColor: 'black',
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
});

type Props = {
  slideX: Animated.Value;
  sliderStartPosition: number;
};

export const Control: React.FC<Props> = ({ slideX, sliderStartPosition }) => {
  const positionX = useRef(new Animated.Value(5)).current;
  const positionY = useRef(new Animated.Value(50)).current;
  const elementPositionY = useRef(50);
  const panResponder = useMemo(
    (): PanResponderInstance =>
      PanResponder.create({
        onMoveShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponderCapture: () => true,
        onPanResponderRelease: ({ nativeEvent }) => {
          if (nativeEvent.locationX < -50) {
            Animated.timing(slideX, {
              duration: 200,
              toValue: 0,
              useNativeDriver: false,
            }).start();
          } else {
            Animated.timing(slideX, {
              duration: 200,
              toValue: sliderStartPosition,
              useNativeDriver: false,
            }).start();
          }

          Animated.timing(positionX, {
            duration: 100,
            toValue: 5,
            useNativeDriver: false,
          }).start();
        },
        onPanResponderMove: ({ nativeEvent }) => {
          elementPositionY.current += -nativeEvent.locationY;
          if (nativeEvent.locationX < -50) {
            Animated.timing(slideX, {
              duration: 0,
              toValue: sliderStartPosition - nativeEvent.locationX,
              useNativeDriver: false,
            }).start();
          } else {
            slideX.setValue(sliderStartPosition);
          }
          Animated.parallel([
            Animated.timing(positionY, {
              toValue: elementPositionY.current,
              duration: 0,
              useNativeDriver: false,
            }),
            Animated.timing(positionX, {
              toValue: nativeEvent.locationX,
              duration: 0,
              useNativeDriver: false,
            }),
          ]).start();
        },
      }),
    [positionX, positionY, slideX, sliderStartPosition]
  );

  const right = positionX.interpolate({
    inputRange: [-50, 0],
    outputRange: [25, 5],
    extrapolate: 'clamp',
  });

  const bottom = positionY;

  return (
    <Animated.View
      style={[styles.root, { right, bottom }]}
      {...panResponder.panHandlers}
    />
  );
};
