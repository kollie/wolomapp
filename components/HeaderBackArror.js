import React from 'react'
import {
    View,
    Text,
    StyleSheet
} from 'react-native'
import Animated, { interpolate } from 'react-native-reanimated'
import { Ionicons as Icon } from '@expo/vector-icons'
import { TapGestureHandler } from 'react-native-gesture-handler'

const HeaderBackArror = ({ isOpenAnimation, gestureHandler }) => {

    const opacity = interpolate(isOpenAnimation, {
        inputRange: [0, 0.9, 1],
        outputRange: [0, 0, 1]
    })

    return (
        <TapGestureHandler {...gestureHandler} >
            <Animated.View style={{ ...styles.backArrow, opacity }}>
                <Icon name='md-arrow-back' size={30} />
            </Animated.View>
        </TapGestureHandler>
    )
}

export default HeaderBackArror

const styles = StyleSheet.create({
    backArrow: {
        position: 'absolute',
        height: 60,
        width: 60,
        top: 60,
        left: 25,
        zIndex: 100
    }
})

