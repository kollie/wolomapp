import { StatusBar } from 'expo-status-bar';
import React, { useRef } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Animated, {
  useCode,
  cond,
  eq,
  set,
  interpolate,
  SpringUtils
} from 'react-native-reanimated'
import {
  withTimingTransition,
  onGestureEvent,
  withSpringTransition
} from 'react-native-redash'


import Logo from '../Logo'
import { SCREEN_HEIGHT, LOGIN_VIEW_HEIGHT } from '../../Constants'
import { TapGestureHandler, State } from 'react-native-gesture-handler';
import Overlay from '../Overlay';
import HeaderBackArror from '../HeaderBackArror';
import HeaderText from '../HeaderText';
import Signin from '../Signin';

const SignControl = () => {

  const scale = useRef(new Animated.Value(0));
  const scaleAnimation = withTimingTransition(scale.current);


  const innerLoginY = interpolate(scaleAnimation, {
    inputRange: [0, 1],
    outputRange: [LOGIN_VIEW_HEIGHT, 0]
  })

  const gestureState = useRef(new Animated.Value(State.UNDETERMINED))
  const gestureHandler = onGestureEvent({ state: gestureState.current })

  const backArrowGestureState = useRef(new Animated.Value(State.UNDETERMINED))
  const backArrowGestureHandler = onGestureEvent({ state: backArrowGestureState.current })

  const isOpen = useRef(new Animated.Value(0))
  const isOpenAnimation = withSpringTransition(isOpen.current, {
    ...SpringUtils.makeDefaultConfig(),
    overshootClamping: true,
    damping: new Animated.Value(20)
  })

  const outerLoginY = interpolate(isOpenAnimation, {
    inputRange: [0, 1],
    outputRange: [SCREEN_HEIGHT - LOGIN_VIEW_HEIGHT, LOGIN_VIEW_HEIGHT / 2]
  })

  const headingOpacity = interpolate(isOpenAnimation, {
    inputRange: [0, 1],
    outputRange: [1, 0]
  })


  useCode(() =>
    cond(
      eq(gestureState.current, State.END),
      [cond(eq(isOpen.current, 0), set(isOpen.current, 1))],
      [gestureState.current]
    )
  )


  useCode(() => cond(eq(scale.current, 0), set(scale.current, 1)), []);

  useCode(() => cond(eq(backArrowGestureState.current, State.END), [
    set(gestureState.current, State.UNDETERMINED),
    set(isOpen.current, 0)
  ]), [backArrowGestureState.current])

  return (
    <View style={styles.container}>
      <View style={{ ...styles.logoContainer }}>
        <Logo scale={scaleAnimation} />
        <Text style={{
          fontSize: 16,
          margin: 30,
          fontWeight: '600',
          color: '#777777'
        }}>Keeping your community clean and safe</Text>
      </View>
      <HeaderBackArror
        isOpenAnimation={isOpenAnimation}
        gestureHandler={{ ...backArrowGestureHandler }}
      />
      <HeaderText isOpenAnimation={isOpenAnimation} />
      <Signin isOpenAnimation={isOpenAnimation} />

      <Animated.View style={{
        backgroundColor: '#ff66c4',
        ...StyleSheet.absoluteFill,
        transform: [{ translateY: outerLoginY }]
      }}>
        <Overlay isOpenAnimation={isOpenAnimation} />

        <Animated.View style={{
          height: LOGIN_VIEW_HEIGHT,

          backgroundColor: '#00c2cb',
          transform: [{ translateY: innerLoginY }],
          opacity: headingOpacity
        }}>
          <TapGestureHandler {...gestureHandler}>
            <Animated.View style={{
              margin: 25,
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <View style={{
                borderWidth: 0.5,
                borderColor: '#fff',
                backgroundColor: '#fff',
                height: 40,
                width: 300,
                borderRadius: 100,

              }}>
                <Text style={{
                  textAlign: 'center',
                  padding: 10,
                  color: '#00c2cb',
                  fontWeight: '700',
                  fontSize: 18
                }}>Get Started Now</Text>
              </View>
            </Animated.View>
          </TapGestureHandler>

        </Animated.View>

      </Animated.View>
    </View>
  );
}

export default SignControl

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00c2cb',
  },
  logoContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  heading: {
    alignItems: 'flex-start',
    marginHorizontal: 25,
    marginTop: 50
  }
});
