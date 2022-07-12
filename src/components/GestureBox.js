import React, {Children, useMemo, useRef} from 'react';
import {View, Image, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {
  Gesture,
  GestureDetector,
  PanGestureHandler,
} from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';

const clamp = (value, lowerBound, upperBound) => {
  'worklet';
  return Math.min(Math.max(lowerBound, value), upperBound);
};

const GestureBox = props => {
  const {
    limitationHeight,
    limitationWidth,
    height = 100,
    width = 100,
    minHeight = height / 2,
    minWidth = width / 2,
    onResizeEnd,
    children,
    resizerImageSource = require('../assets/icons/resize.png'),
    closeImageSource = require('../assets/icons/close.png'),
    rotateImageSource = require('../assets/icons/rotation.png'),
    style,
    isSelected,
    onRemove,
  } = props;
  const heightRef = useRef(height);
  const widthRef = useRef(width);
  const boxHeight = useSharedValue(heightRef.current ?? 100);
  const boxWidth = useSharedValue(widthRef.current ?? 100);
  const offset = useSharedValue({x: 0, y: 0});
  const start = useSharedValue({x: 0, y: 0});
  const scale = useSharedValue(1);
  const savedScale = useSharedValue(1);
  const rotation = useSharedValue(0);
  const savedRotation = useSharedValue(0);
  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {translateX: offset.value.x},
        {translateY: offset.value.y},
        {scale: scale.value},
        {rotateZ: `${rotation.value}rad`},
      ],
      height: boxHeight.value,
      width: boxWidth.value,
      position: 'absolute',
      flexDirection: 'row',
      zIndex: 1,
      borderWidth: isSelected ? 1 : 0,
      borderColor: 'red',
    };
  });

  const dragGesture = Gesture.Pan()
    .averageTouches(true)
    .onUpdate(e => {
      if (isSelected) {
        offset.value = {
          x: clamp(
            e.translationX + start.value.x,
            -boxWidth.value / 2,
            limitationWidth - boxWidth.value / 2,
          ),
          y: clamp(
            e.translationY + start.value.y,
            -boxHeight.value / 2,
            limitationHeight - boxHeight.value / 2,
          ),
        };
      }
    })
    .onEnd(() => {
      if (isSelected) {
        start.value = {
          x: offset.value.x,
          y: offset.value.y,
        };
      }
    });

  const zoomGesture = Gesture.Pinch()
    .onUpdate(event => {
      if (isSelected) {
        scale.value = event.scale > 0.7 ? savedScale.value * event.scale : 0.7;
      }
    })
    .onEnd(() => {
      if (isSelected) {
        savedScale.value = scale.value;
      }
    });

  const rotateGesture = Gesture.Rotation()
    .onUpdate(event => {
      if (isSelected) {
        rotation.value = savedRotation.value + event.rotation;
      }
    })
    .onEnd(() => {
      if (isSelected) {
        savedRotation.value = rotation.value;
      }
    });

  const composed = Gesture.Simultaneous(
    dragGesture,
    Gesture.Simultaneous(zoomGesture, rotateGesture),
  );
  const resizeHandler = useAnimatedGestureHandler({
    onStart: (_ev, ctx) => {
      ctx.boxWidth = boxWidth.value;
      ctx.boxHeight = boxHeight.value;
      ctx.offsetX = start.value.x;
      ctx.offsetY = start.value.y;
    },
    onActive: (ev, ctx) => {
      if (!isSelected) {
        return;
      }
      boxWidth.value = clamp(
        ctx.boxWidth + ev.translationX,
        50,
        limitationWidth - offset.value.x,
      );
      boxHeight.value = clamp(
        ctx.boxHeight + ev.translationY,
        50,
        limitationHeight - offset.value.y,
      );
    },
    onFinish: () => {
      'worklet';
      if (onResizeEnd) {
        runOnJS(onResizeEnd)({
          x: start.value.x,
          y: start.value.y,
          height: boxHeight.value,
          width: boxWidth.value,
        });
      }
    },
  });

  const styless = useMemo(
    () =>
      StyleSheet.create({
        closeBoxStyle: {
          position: 'absolute',
          zIndex: 20,
          elevation: 20,
          right: -5,
          top: 0,
        },
        resizeBoxStyle: {
          position: 'absolute',
          zIndex: 20,
          elevation: 20,
          right: -10,
          bottom: -10,
          transform: [{scale: 1}],
        },
        imageStyle: {
          height: 20,
          width: 20,
        },
      }),
    [],
  );

  return (
    <>
      <GestureDetector gesture={composed}>
        <Animated.View style={[animatedStyles]}>
          {isSelected && (
            <View
              style={[styless.closeBoxStyle, {width: width, height: height}]}>
              <TouchableOpacity onPress={onRemove} style={styles.close}>
                <Image
                  source={closeImageSource}
                  style={styless.imageStyle}
                  resizeMode={'contain'}
                />
              </TouchableOpacity>
            </View>
          )}
          {isSelected && (
            <PanGestureHandler onGestureEvent={resizeHandler}>
              <Animated.View style={[styless.resizeBoxStyle]}>
                <Image
                  source={resizerImageSource}
                  style={styless.imageStyle}
                  resizeMode={'cover'}
                />
              </Animated.View>
            </PanGestureHandler>
          )}
          {children}
        </Animated.View>
      </GestureDetector>
    </>
  );
};
const styles = StyleSheet.create({
  viewContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  eachViewContainer: {
    position: 'relative',
  },
  rotation: {
    position: 'absolute',
    top: -10,
    right: -5,
    zIndex: 10,
    elevation: 10,
  },
  close: {
    position: 'absolute',
    top: -10,
    right: -5,
    zIndex: 10,
    elevation: 10,
  },
});
export default GestureBox;
