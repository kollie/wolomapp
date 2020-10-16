import React, { useState, useEffect } from 'react';
import { Button, Image, View, Platform, ScrollView, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { AntDesign, Fontisto } from '@expo/vector-icons';
import { connect } from 'react-redux';
import { refreshToken } from '../store/actions';

const PickImage = (props) => {
  const [image, setImage] = useState(null);


  const pickImageLibrary = async () => {

    if (Platform.OS !== 'web') {
      const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
      if (status === 'granted') {

        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          base64: true,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });

        // console.log(result);

        if (!result.cancelled) {
          setImage(result);
          props.onImagePicked({ uri: result })
        }
      } else {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
  };


  const pickImageCamera = async () => {

    if (Platform.OS !== 'web') {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status === 'granted') {

        let result = await ImagePicker.launchCameraAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          base64: true,
          aspect: [4, 3],
          quality: 1,
        });

        // console.log(result);

        if (!result.cancelled) {
          setImage(result);
          props.onImagePicked({ uri: result })
        }
      } else {
        alert('Sorry, we need camera permissions to make this work!');
      }
    }
  };

  let imageUri = image ? `data:image/jpg;base64,${image.base64}` : null

  return (
    <View style={{ flex: 1 }}>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <AntDesign name="picture" size={40} color="#03989e"
          onPress={pickImageLibrary}
        />
        <Fontisto name="camera" size={35} color="#03989e"
          onPress={pickImageCamera}
        />
      </ScrollView>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}
        style={{ borderWidth: 1, padding: 10, borderRadius: 15, borderColor: '#03989e' }}
      >
        {image
          ? <Image
            source={{ uri: imageUri }}
            style={{ width: 100, height: 100, borderRadius: 12, overflow: 'hidden' }}
          />
          : null}
      </ScrollView>
    </View>
  );
}


const mapStateToProps = state => {
  return {
    email: state.auth.email
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTokenRefresh: email => dispatch(refreshToken(email))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PickImage)


const styles = StyleSheet.create({
  mediaImageContainer: {
    width: 180,
    height: 200,
    borderRadius: 12,
    overflow: "hidden",
    marginHorizontal: 10
  },
})
