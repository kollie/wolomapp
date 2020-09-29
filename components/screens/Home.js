import React from 'react'
import { View, Text, Button, StatusBar, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import SafeAreaView  from 'react-native-safe-area-view' 
import { Feather, AntDesign } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable'
import { LOGIN_VIEW_HEIGHT, SCREEN_HEIGHT, SCREEN_WIDTH } from '../../Constants';


const Home = ({ navigation }) => {
    return (
      <SafeAreaView style={{ ...styles.container }}>
        <StatusBar barStyle="dark-content" backgroundColor="#ecf0f1" />
        <ScrollView>
          <Text>Home Screen</Text>
          <Button title='Go to Details'
            onPress={() => navigation.navigate('Details')} 
          />
        </ScrollView>
        
        <TouchableOpacity style={{...styles.addButton}}
        onPress={() => navigation.navigate('Notifications')}
        >
          <AntDesign name="pluscircleo" color='#03989e' size={50} />
        </TouchableOpacity>
      </SafeAreaView>
    );
}

export default Home

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center',
    backgroundColor: '#f0f0f0'
},
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    zIndex: 100
  }
})
