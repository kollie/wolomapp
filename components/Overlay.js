import React from 'react'
import { Text, StyleSheet } from 'react-native'
import Animated, { interpolate } from 'react-native-reanimated'


import { LOGIN_VIEW_HEIGHT, SCREEN_HEIGHT } from '../Constants'
import { interpolateColor } from 'react-native-redash'

const Overlay = ({ isOpenAnimation }) => {

    const translateY = interpolate(isOpenAnimation, {
        inputRange: [0, 1],
        outputRange: [SCREEN_HEIGHT - LOGIN_VIEW_HEIGHT, -LOGIN_VIEW_HEIGHT]
    })

    const backgroundColor = interpolateColor(isOpenAnimation, {
        inputRange: [0, 0.1, 1],
        outputRange: ['#00c2cb', '#ff66c4', '#ff66c4']
    })

    return (
        <Animated.View style={{
            ...styles.overlay,
            transform: [{ translateY }],
            backgroundColor
          }}>

        </Animated.View>
    )
}

export default Overlay

const styles = StyleSheet.create({
    overlay: {
        height: LOGIN_VIEW_HEIGHT,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0
    }
})
