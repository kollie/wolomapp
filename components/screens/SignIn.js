import React, { useState, useContext, useRef, useEffect } from 'react'
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Platform,
  TextInput,
  StatusBar,
  Alert,
  ScrollView
} from 'react-native'

import { LinearGradient } from 'expo-linear-gradient'
import { AntDesign } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable'
import { connect } from 'react-redux'
import { handleAuth, retrieveToken, signInWithGoogleAsync } from '../store/actions/index'


const SignIn = ({ navigation, onLogin, isLoading }) => {



  const handLogin = () => {
    const sign = signInWithGoogleAsync()
    sign.then((res) => {
      onLogin(res.user.email, res.user.name, res.user.photoUrl)
    }).catch((e) => {
      console.log(e)
    })
  }

  let submitButton = (
    <View style={styles.button}>
      <TouchableOpacity
        style={styles.signIn}
        onPress={() => { handLogin() }}
      >
        <LinearGradient
          colors={['#08d4c4', '#01ab9d']}
          style={styles.signIn}
        >
          <Text style={[styles.textSign, {
            color: '#fff'
          }]}> <AntDesign name="google" size={24} color="#ff5757"
            style={{ paddingTop: 20 }}
            />  Sign In with Google</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  )

  if (isLoading) {
    submitButton = (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator size='large' />
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor='#009387' barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.text_header}>Wolomapp</Text>
      </View>

      <Animatable.View
        animation="fadeInUpBig"
        style={styles.footer}
      >
        <ScrollView>
          <Text style={{ ...styles.title }}>Sign in to get started</Text>

          {submitButton}

        </ScrollView>
      </Animatable.View>
    </View>
  );
}

const mapStateToProps = state => {
  return {
    isLoading: state.loading.isLoading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onLogin: (email, name, picture) => dispatch(handleAuth(email, name, picture)),
    getToken: () => dispatch(retrieveToken())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#08d4c4'
  },
  header: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 50
  },
  footer: {
    flex: 2,
    backgroundColor: '#fff',
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
  text_footer: {
    color: '#05375a',
    fontSize: 18
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5
  },
  actionError: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#FF0000',
    paddingBottom: 5
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#05375a',
  },
  errorMsg: {
    color: '#FF0000',
    fontSize: 14,
  },
  button: {
    alignItems: 'center',
    marginTop: 50
  },
  signIn: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10
  },
  textSign: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  title: {
    color: '#05375a',
    fontSize: 30,
    fontWeight: 'bold'
  },
})
