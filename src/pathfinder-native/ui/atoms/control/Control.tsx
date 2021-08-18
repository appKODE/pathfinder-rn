import React, { useMemo, useRef } from 'react';
import {
  StyleSheet,
  Animated,
  PanResponderInstance,
  PanResponder,
  Dimensions,
  View,
} from 'react-native';

const styles = StyleSheet.create({
  touchArea: {
    position: 'absolute',
    right: 0,
    bottom: 50,
    height: 50,
    width: 20,
    alignItems: 'flex-end',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  content: {
    height: 40,
    width: 5,
    backgroundColor: 'gray',
    borderRadius: 25,
    elevation: 3,
    shadowColor: 'black',
    shadowOpacity: 0.3,
    shadowRadius: 5,
    marginRight: 5,
  },
});

type Props = {
  slideX: Animated.Value;
  sliderStartPosition: number;
  onOpen: () => void;
};

export const Control: React.FC<Props> = ({
  slideX,
  sliderStartPosition,
  onOpen,
}) => {
  const positionX = useRef(new Animated.Value(0)).current;
  const positionY = useRef(new Animated.Value(50)).current;
  const panResponder = useMemo(
    (): PanResponderInstance =>
      PanResponder.create({
        onMoveShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponderCapture: () => true,
        onPanResponderRelease: (_, gesture) => {
          if (gesture.dx < -50) {
            Animated.timing(slideX, {
              duration: 200,
              toValue: 0,
              useNativeDriver: false,
            }).start(() => {
              onOpen();
            });
          } else {
            Animated.timing(slideX, {
              duration: 200,
              toValue: sliderStartPosition,
              useNativeDriver: false,
            }).start();
          }

          Animated.timing(positionX, {
            duration: 100,
            toValue: 0,
            useNativeDriver: false,
          }).start();
        },
        onPanResponderMove: (_, gesture) => {
          if (gesture.dx < -50) {
            Animated.timing(slideX, {
              duration: 0,
              toValue: sliderStartPosition - gesture.dx,
              useNativeDriver: false,
            }).start();
          } else {
            slideX.setValue(sliderStartPosition);
          }
          Animated.parallel([
            Animated.timing(positionY, {
              toValue:
                Dimensions.get('window').height - gesture.y0 - gesture.dy,
              duration: 0,
              useNativeDriver: false,
            }),
            Animated.timing(positionX, {
              toValue: gesture.dx,
              duration: 0,
              useNativeDriver: false,
            }),
          ]).start();
        },
      }),
    [positionX, positionY, slideX, sliderStartPosition, onOpen]
  );

  const right = positionX.interpolate({
    inputRange: [-50, 0],
    outputRange: [25, 0],
    extrapolate: 'clamp',
  });

  const bottom = positionY;

  const opacity = slideX.interpolate({
    inputRange: [sliderStartPosition, sliderStartPosition + 1],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  return (
    <Animated.View
      style={[styles.touchArea, { right, bottom, opacity }]}
      {...panResponder.panHandlers}
    >
      <View style={styles.content} />
    </Animated.View>
  );
};
