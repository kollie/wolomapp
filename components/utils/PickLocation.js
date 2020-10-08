import React, { useState, useEffect } from "react";
import {
  View,
  Image,
  Button,
  StyleSheet,
  Text,
  Dimensions,
  TouchableHighlight
} from "react-native";
import MapView from "react-native-maps";
import * as Animatable from 'react-native-animatable'

const PickLocation = (props) => {

    let map;
    
    const [location, setLocation] = useState({
        latitude: 6.300774,
        longitude: -10.797160,
        latitudeDelta: 0.0122,
        longitudeDelta:
            Dimensions.get("window").width /
            Dimensions.get("window").height *
            0.0122,
        locationChosen: false
    })
  
  const pickLocationHandler = event => {
    const coords = event.nativeEvent.coordinate;

    map.animateToRegion({
      ...location,
      latitude: coords.latitude,
      longitude: coords.longitude
    });

    setLocation({
        ...location,
        latitude: coords.latitude,
        longitude: coords.longitude,
        locationChosen: true
    })
    props.onLocationPick({
      latitude: coords.latitude,
      longitude: coords.longitude
    });
    console.log(coords)
  };

  const getLocationHandler = () => {
    navigator.geolocation.getCurrentPosition(pos => {
      const coordsEvent = {
        nativeEvent: {
          coordinate: {
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude
          }
        }
      };
      pickLocationHandler(coordsEvent);
    },
  err => {
    console.log(err);
    alert("There was an error fetching your location!");
  })
  }

  useEffect(() => {
    setTimeout(() => {
      getLocationHandler()
    }, 1000)
  },[])

    let marker = null;

    if (location.locationChosen) {
      marker = <MapView.Marker coordinate={location} />;
    }

    return (
      <View style={styles.container}>
        <MapView
          initialRegion={location}
          style={styles.map}
          onPress={pickLocationHandler}
          ref={ref => map = ref}
        >
          {marker}
        </MapView>
        <Animatable.View
         style={{...styles.button,
          alignItems: 'center', 
          justifyContent: 'center', 
          height: 40, width: 200,
          borderRadius: 100,
          borderWidth: 0.5,
          borderColor: '#03989e',
          backgroundColor: '#fff',
          opacity: 0.7
        }}
        onStartShouldSetResponder={getLocationHandler}
         >
           <Text style={{color: '#777777', fontWeight: '700'}}>Set Your Location</Text>
          {/* <Button title="Locate Me" onPress={getLocationHandler} /> */}
        </Animatable.View>
      </View>
    );
}

export default PickLocation

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    alignItems: "center"
  },
  map: {
    flex: 1,
    width: "100%",
    height: 300,
    borderRadius: 10
  },
  button: {
    position: 'absolute',
    top: '80%',
    alignSelf: 'center'
  }
});


