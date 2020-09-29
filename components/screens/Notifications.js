import React from 'react'
import { Text, View, StyleSheet } from 'react-native'
import * as Animatable from 'react-native-animatable'

const Notifications = ({navigation}) => {
  navigation.setOptions({ tabBarVisible: false })
    return (
      <Animatable.View style={{ ...styles.container }}
      animation='fadeInUpBig'
      >
        <Text>Profile Screen</Text>
      </Animatable.View>
    );
}

export default Notifications

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        alignItems: 'center', 
        justifyContent: 'center',
        backgroundColor: '#f0f0f0'
    }
})
