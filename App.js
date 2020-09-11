import 'react-native-gesture-handler'

import { StatusBar } from 'expo-status-bar'
import React, { useReducer, useMemo, useEffect } from 'react';
import { StyleSheet, Button, View, Text, ActivityIndicator, AsyncStorage } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createDrawerNavigator } from '@react-navigation/drawer'



import SignControl from './components/screens/SignControl'
import MainTabScreen from './components/screens/MainTab';
import DrawerContent from './components/screens/DrawerContent'
import RootStackScreen from './components/screens/RootStackScreen';
import { AuthContext } from './Constants';

const Drawer = createDrawerNavigator()

export default function App() {

  const initialLoginState = {
    isLoading: true,
    email: null,
    userToken: null
  }

  const loginReducer = (prevState, action) => {
    switch(action.type) {
      case 'RETRIEVE_TOKEN':
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false
        };
      case 'LOGIN':
        return {
          ...prevState,
          email: action.id,
          userToken: action.token,
          isLoading: false
        };
      case 'LOGOUT':
        return {
          ...prevState,
          email: null,
          userToken: null,
          isLoading: false
        };
    }
  }

  const [loginState, dispatch] = useReducer(loginReducer, initialLoginState)

  const authContext = useMemo(() => ({
    signIn: async (foundUser) =>{
      const userToken = String(foundUser[0].userToken);
      const email = foundUser[0].email;
        try {
          await AsyncStorage.setItem('userToken', userToken)
          await AsyncStorage.setItem('email', email)
        } catch (e) {
          console.log(e)
        }
      dispatch({type: 'LOGIN', id: email, token: userToken})
    },
    signOut: async () => {

      try {
        await AsyncStorage.removeItem('userToken')
      } catch (e) {
        console.log(e)
      }

      dispatch({type: 'LOGOUT'})
    },
    signUp: () => {}
  }), [])

  useEffect(() => {
    setTimeout( async () => {

      let userToken;
      userToken = null;

      try {
        userToken = await AsyncStorage.getItem('userToken', userToken)
      } catch (e) {
        console.log(e)
      }

      dispatch({ type: 'RETRIEVE_TOKEN', token: userToken })
    }, 1000)
  },[])

  if (loginState.isLoading) {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <ActivityIndicator size='large' />
      </View>
    )
  }

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        { loginState.userToken !== null ? (
          <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}>
            <Drawer.Screen name="HomeDrawer" component={MainTabScreen} />
          </Drawer.Navigator>
        ) : <RootStackScreen /> }
      </NavigationContainer>
    </AuthContext.Provider>
  );
}

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
