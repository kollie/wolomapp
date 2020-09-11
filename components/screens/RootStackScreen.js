import React from 'react'

import { createStackNavigator } from '@react-navigation/stack'
import Splash from './Splash'
import SignIn from './SignIn'
import SignUp from './SignUp'

const RootStack = createStackNavigator()


const RootStackScreen = () => (
    <RootStack.Navigator headerMode='none'>
        <RootStack.Screen name='SplashScreen' component={Splash} />
        <RootStack.Screen name='SignInScreen' component={SignIn} />
        <RootStack.Screen name='SignUpScreen' component={SignUp} />
    </RootStack.Navigator>
)

export default RootStackScreen

