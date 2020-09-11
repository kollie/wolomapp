import React from 'react'
import {
    View,
    Text,
    StyleSheet,
    TouchableNativeFeedback
} from 'react-native'
import Animated, { interpolate, ceil } from 'react-native-reanimated'
import { Entypo, Ionicons } from '@expo/vector-icons'; 

import { LOGIN_VIEW_HEIGHT } from '../Constants'

const Signin = ({ isOpenAnimation }) => {

    const opacity = interpolate(isOpenAnimation, {
        inputRange: [0, 0.9, 1],
        outputRange: [0, 0, 1]
    })

    return (
        <Animated.View style={{ ...styles.headerText, opacity }}>
            <TouchableNativeFeedback
                onPress={() => {console.log('working now!!')}}
            >
                <Animated.View style={{
                    ...styles.buttonContainer
                }}>
                <View style={{
                    ...styles.buttonStyle,
                    flexDirection: 'row'

                }}>
                    <Ionicons name="logo-facebook" size={30} color="#5271ff" style={{
                        ...styles.iconStyle
                    }} />
                    <Text style={{
                    ...styles.loginText
                    }}>
                        Signin with Facebook
                    </Text>
                </View>
                </Animated.View>
            </TouchableNativeFeedback>
            

            <TouchableNativeFeedback
                onPress={() => {console.log('also working now!!')}}
            >
                <Animated.View style={{
                    ...styles.buttonContainer
                }}>
                <View style={{
                    ...styles.buttonStyle,
                    flexDirection: 'row'

                }}>
                    <Ionicons name="logo-google" size={30} color="#ff5757" style={{
                        ...styles.iconStyle
                    }} />
                    <Text style={{
                    ...styles.loginText
                    }}>
                        Signin with Google
                    </Text>
                </View>
                </Animated.View>
            </TouchableNativeFeedback>
            
        </Animated.View>
    )
}

export default Signin

const styles = StyleSheet.create({
    headerText: {
        zIndex: 100,
        position: 'absolute',
        top: 200, 
        left: 0, 
        right: 0,
    },
    buttonStyle: {
        borderWidth: 0.5,
        borderColor: '#fff',
        backgroundColor: '#fff',
        height: 50,
        width: 300,
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonContainer: {
        margin: 25, 
        flex: 1, 
        alignItems: 'center', 
        justifyContent: 'center'
    },
    loginText: {
        textAlign: 'center',
        padding: 10,
        color: '#ff66c4',
        fontWeight: '700',
        fontSize: 20,
    },
    iconStyle: {
        left: 20,
        margin: 10,
        paddingRight: 10,
        textAlign: 'center'
    }
})

