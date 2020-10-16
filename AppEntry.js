import 'react-native-gesture-handler'

import { StatusBar } from 'expo-status-bar'
import React, { useEffect } from 'react';
import { connect } from 'react-redux'
import { StyleSheet, View, ActivityIndicator } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { SafeAreaProvider } from 'react-native-safe-area-context';



import SignControl from './components/screens/SignControl'
import MainTabScreen from './components/screens/MainTab';
import DrawerContent from './components/screens/DrawerContent'
import RootStackScreen from './components/screens/RootStackScreen';
import { retrieveToken } from './components/store/actions/index'
import Details from './components/screens/Details';
import Notifications from './components/screens/Notifications';


const AppEntry = ({ isLoading, userToken, getToken }) => {


  useEffect(() => {

    setTimeout(() => {
      getToken()
    }, 1000)
  }, [])


  if (isLoading) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator size='large' />
      </View>
    )
  }


  return (
    <SafeAreaProvider>
      <NavigationContainer>
        {userToken !== null ? (
          <MainTabScreen />
        ) : <RootStackScreen />}
      </NavigationContainer>
    </SafeAreaProvider>
  );
}


const mapStateToProps = state => {
  return {
    isLoading: state.loading.isLoading,
    userToken: state.auth.userToken
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getToken: () => dispatch(retrieveToken())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppEntry)


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
