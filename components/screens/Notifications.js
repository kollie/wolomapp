import React, { useState, useLayoutEffect, useEffect, useRef } from 'react'
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Alert
} from 'react-native'
import * as Animatable from 'react-native-animatable'
import PickLocation from '../utils/PickLocation'
import PickImage from '../utils/PickImage'
import { connect } from 'react-redux'
import { createIssue, refreshToken } from '../store/actions'

const Notifications = ({ navigation, isLoading, email, id, token, onCreateIssue, onTokenRefresh }) => {
  navigation.setOptions({ tabBarVisible: false })

  useEffect(() => {
    setTimeout(() => {
      onTokenRefresh(email)
    }, 1000)
  }, [])

  const [data, setData] = useState({
    location: null,
    images: null,
    description: '',
    locationValid: false,
    imageValid: false,
    descriptionValid: false
  })


  navigation.setOptions({
    headerRight: () => (
      <TouchableOpacity
        onPress={() => handSave()}
        style={{ margin: 20 }}
        disabled={!data.imageValid || !data.locationValid || !data.descriptionValid}
      >
        <Text style={{
          color: '#03989e',
          fontWeight: '500',
          fontSize: 14
        }}
        >Save</Text>
      </TouchableOpacity>
    ),
  });



  const locationPickedHandler = location => {
    // console.log('lat: '+location.latitude, 'long: '+ location.longitude)
    setData({
      ...data,
      location: location,
      locationValid: true
    })
  };

  const imagePickedHandler = images => {
    setData({
      ...data,
      images: images,
      imageValid: true
    })
  };

  const textInputChange = (val) => {
    if (val.trim().length >= 4) {
      setData({
        ...data,
        description: val,
        descriptionValid: true
      })
    } else {
      setData({
        ...data,
        description: val,
        descriptionValid: false
      })
    }
  }

  const handSave = () => {
    if (data.description.length === 0) {
      Alert.alert('No Description added', 'You must describe the issue you are sharing', [
        { text: 'Okay' }
      ]);
      return
    }

    onCreateIssue(email, id, data.description, data.location.latitude, data.location.longitude, data.images.uri.base64, token)
    navigation.navigate('Home')
    // onLogin(email, name, password)
  }


  if (isLoading) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator size='large' />
      </View>
    )
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View style={styles.header}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={{ color: '#AEB5BC' }}>Add Description</Text>
            <TextInput
              placeholder="Description"
              style={{ ...styles.textInput }}
              onChangeText={(val) => textInputChange(val)}
            />
            {data.descriptionValid ? null :
              <Animatable.View
                animation='fadeInLeft'
                duration={500}
              >
                <Text style={{ ...styles.errorMsg }}>You must add a description.</Text>
              </Animatable.View>
            }
            <Text style={{ color: '#AEB5BC' }}>Add Pictures</Text>
            <View>
              <PickImage onImagePicked={imagePickedHandler} />
            </View>
            {data.imageValid ? null :
              <Animatable.View
                animation='fadeInLeft'
                duration={500}
              >
                <Text style={{ ...styles.errorMsg }}>You must add an image.</Text>
              </Animatable.View>
            }
          </ScrollView>
        </View>
        <Animatable.View
          animation='fadeInUpBig'
          style={styles.footer}
        >
          <PickLocation onLocationPick={locationPickedHandler} />
        </Animatable.View>
      </View>
    </TouchableWithoutFeedback>

  );
}

const mapStateToProps = state => {
  return {
    isLoading: state.loading.isLoading,
    email: state.auth.email,
    id: state.auth.userId,
    token: state.auth.userToken
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onCreateIssue: (email,
      userId,
      description,
      latitude,
      longitude,
      picture,
      token) => dispatch(
        createIssue(
          email,
          userId,
          description,
          latitude,
          longitude,
          picture,
          token)),
    onTokenRefresh: email => dispatch(refreshToken(email))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Notifications)


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0'
  },
  header: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 50,
    marginTop: 20
  },
  footer: {
    flex: 1,
    backgroundColor: '#03989e',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30
  },
  text_header: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 30
  },
  errorMsg: {
    color: '#FF0000',
    fontSize: 14,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    borderWidth: 1,
    color: '#05375a',
    height: 40,
    borderRadius: 5,
    borderColor: '#03989e'
  }
})
