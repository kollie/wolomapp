import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  TextInput
} from "react-native";
import * as Animatable from 'react-native-animatable'

const DescriptionInput = (props) => {

    const [description, setDescription] = useState('')

    useEffect(() => {
        setTimeout(() => {
          getLocationHandler()
        }, 1000)
      },[])

    
    return (
      <View style={styles.container}>
        <TextInput 
            placeholder="Description"
            value={description}
            onChangeText={(value) => setDescription(value)}
        />
      </View>
    );
}

export default DescriptionInput

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    alignItems: "center"
  },
});


