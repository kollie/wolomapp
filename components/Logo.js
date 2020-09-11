import React from 'react'
import Animated from 'react-native-reanimated'
import {
    Text,
    StyleSheet
} from 'react-native'


const Logo = ({ scale }) => (
    <Animated.View style={{...styles.logo, transform: [{ scale }] }}>
        <Text style={{ ...styles.logoText }}>Wolomapp</Text>
    </Animated.View>
)

export default Logo

const styles = StyleSheet.create({
    logo: {
        backgroundColor: '#ff5757',
        height: 120,
        width: 120,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    logoText: {
        fontWeight: '800',
        fontSize: 16,
        color: '#fff'
    }
})

