import React from 'react'
import {
    View,
    Text,
    StyleSheet
} from 'react-native'
import Animated, { interpolate } from 'react-native-reanimated'


const HeaderText = ({ isOpenAnimation }) => {

    const opacity = interpolate(isOpenAnimation, {
        inputRange: [0, 0.9, 1],
        outputRange: [0, 0, 1]
    })

    return (
        <Animated.View style={{ ...styles.headerText, opacity }}>
            <Text style={{
                textAlign: 'center',
                color: '#fff',
                fontWeight: '500',
                fontSize: 25,
            }}>You are just one step away</Text>
        </Animated.View>
    )
}

export default HeaderText

const styles = StyleSheet.create({
    headerText: {
        zIndex: 100,
        position: 'absolute',
        top: 100, 
        left: 0, 
        right: 0,
    }
})

