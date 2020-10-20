import React, { useEffect, useState } from 'react'
import { View, Text, StatusBar, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native'
import SafeAreaView from 'react-native-safe-area-view'
import { AntDesign, FontAwesome5, MaterialIcons, Ionicons } from '@expo/vector-icons';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper'
import * as Animatable from 'react-native-animatable'
import { LOGIN_VIEW_HEIGHT, SCREEN_HEIGHT, SCREEN_WIDTH } from '../../Constants';
import MapView from 'react-native-maps';


const Profile = ({ navigation }) => {



  return (
    <SafeAreaView style={{ ...styles.container }}>
      <StatusBar barStyle="dark-content" backgroundColor="#ecf0f1" />
      <ScrollView contentContainerStyle={{alignItems:'center', justifyContent: 'center'}}>
        <Text style={{textAlign: 'center'}}>Coming soon....</Text>
        {/* <Card
          style={{ backgroundColor: '#f1f1f1' }}
        >
          <Card.Title title="Momo Weah"
            subtitle={
              <Text>
                Redlignt Market | 1day <Ionicons name="ios-checkmark-circle-outline" size={10} color="#03989e" />
              </Text>
            }
            left={props =>
              <Avatar.Image {...props} source={{
                uri: 'https://picsum.photos/700'
              }} />
            } />

          <MapView
            initialRegion={{
              ...location2,
              latitudeDelta: 0.0122,
              longitudeDelta:
                Dimensions.get("window").width /
                Dimensions.get("window").height *
                0.0122
            }}
            style={styles.map}
          >
            <MapView.Marker coordinate={location2} />
          </MapView>

          <Card.Cover source={{ uri: 'https://picsum.photos/700' }}
            style={{ marginTop: 1 }}
          />
          <Card.Actions>
            <MaterialIcons name="comment" size={30} color="#03989e" />
          </Card.Actions>
          <Card.Content>
            <Paragraph
              style={{
                fontFamily: "HelveticaNeue",
                color: "#52575D"
              }}
            >Pile of dirt needs quick attention.
              </Paragraph>
          </Card.Content>

        </Card> */}

      </ScrollView>

      <TouchableOpacity style={{ ...styles.addButton }}
        onPress={() => navigation.navigate('Notifications')}
      >
        <AntDesign name="pluscircleo" color='#03989e' size={50} />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

export default Profile

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  addButton: {
    position: 'absolute',
    bottom: 10,
    right: 20,
    zIndex: 100
  },
  map: {
    flex: 1,
    height: 250,
    borderWidth: 0.2,
    borderColor: '#03989e'
  },
})
