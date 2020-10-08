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

import {LinearGradient} from 'expo-linear-gradient'
import { FontAwesome, Feather } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable'
import { connect } from 'react-redux'
import { handleAuth, retrieveToken } from '../store/actions/index'


import { AuthContext } from '../../Constants';
import Users from '../../Users'


const SignIn = ({navigation, onLogin, isLoading}) => {

    const firstRender = useRef(true)
  
    
    const [disable, setDisabled] = useState(true)
    
   
    const [nameError, setNameError] = useState(null)
    const [emailError, setEmailError] = useState(null)
    const [passwordError, setPasswordError] = useState(null)
    
    // set initial state value(s) for example:
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
   
  

    const handLogin = () => {
      if (email.length === 0 || password.length === 0) {
        Alert.alert('Wrong Input', 'Email or password field cannot be empty', [
          {text: 'Okay'}
        ]);
        return
      }
      onLogin(email, name, password)
    }

    useEffect(() => {
    
     
      if (firstRender.current) {
        firstRender.current = false
        return
      }
     
      setDisabled(emailValidation())
      setDisabled(nameValidation())
      setDisabled(passwordValidation())
    }, [email, name, password]) 

    
    
    const emailValidation = () => {
      if (email.length < 4) {
        setEmailError('Email must be 4 characters long.')
        return true
      } else {
        setEmailError(null)
        return false
      }
    }

    const nameValidation = () => {
      if (name.length < 4) {
        setNameError('Name must 4 characters long.')
        return true
      } else {
        setNameError(null)
        return false
      }
    }

    const passwordValidation = () => {
      if (password.length < 8) {
        setPasswordError('Password must be 8 characters long.')
        return true
      } else {
        setPasswordError(null)
        return false
      }
    }

    let submitButton = (
      <View style={styles.button}>
            <TouchableOpacity
                    style={styles.signIn}
                    onPress={() => {handLogin()}}
                    disabled={disable}
                >
                <LinearGradient
                    colors={['#08d4c4', '#01ab9d']}
                    style={styles.signIn}
                >
                    <Text style={[styles.textSign, {
                        color:'#fff'
                    }]}>Sign In</Text>
                </LinearGradient>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => navigation.navigate('SignUpScreen')}
                    style={[styles.signIn, {
                        borderColor: '#08d4c4',
                        borderWidth: 1,
                        marginTop: 15
                    }]}
                >
                    <Text style={[styles.textSign, {
                        color: '#08d4c4'
                    }]}>Sign Up</Text>
            </TouchableOpacity>
      </View>
    )

    if (isLoading) {
      submitButton = (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <ActivityIndicator size='large' />
        </View>
      )
    }

    return (
      <View style={styles.container}>
          <StatusBar backgroundColor='#009387' barStyle="light-content"/>
        <View style={styles.header}>
            <Text style={styles.text_header}>Wolomapp</Text>
        </View>

        <Animatable.View 
            animation="fadeInUpBig"
            style={styles.footer}
        >
          <ScrollView>
          <Text style={styles.text_footer}>Email</Text>
            <View style={styles.action}>
                <FontAwesome 
                    name="user-o"
                    color="#05375a"
                    size={20}
                />
                <TextInput 
                    placeholder="Your Email"
                    style={styles.textInput}
                    autoCapitalize="none"
                    value={email}
                    onChangeText={(value) => setEmail(value)}
                />
                {/* {data.check_textInputChange ? 
                <Animatable.View
                    animation="bounceIn"
                >
                    <Feather 
                        name="check-circle"
                        color="green"
                        size={20}
                    />
                </Animatable.View>
                : null} */}
            </View>

            {emailError &&
            <Animatable.View
            animation='fadeInLeft'
            duration={500}
            >
              <Text style={{...styles.errorMsg}}>{emailError}</Text>
            </Animatable.View>
            }


            <Text style={styles.text_footer}>Name</Text>
            <View style={styles.action}>
                <FontAwesome 
                    name="user-o"
                    color="#05375a"
                    size={20}
                />
                <TextInput 
                    placeholder="Your Name"
                    style={styles.textInput}
                    value={name}
                    onChangeText={(value) => setName(value)}
                />
            </View>
            
            {nameError &&
            <Animatable.View
            animation='fadeInLeft'
            duration={500}
            >
              <Text style={{...styles.errorMsg}}>{nameError}</Text>
            </Animatable.View>
            }

            <Text style={[styles.text_footer, {
                marginTop: 35
            }]}>Password</Text>
            <View style={styles.action}>
                <Feather 
                    name="lock"
                    color="#05375a"
                    size={20}
                />
                <TextInput 
                    placeholder="Your Password"
                    secureTextEntry
                    value={password}
                    style={styles.textInput}
                    autoCapitalize="none"
                    onChangeText={(value) => setPassword(value)}
                />
                {/* <TouchableOpacity
                    onPress={updateSecureTextEntry}
                >
                    {data.secureTextEntry ? 
                    <Feather 
                        name="eye-off"
                        color="grey"
                        size={20}
                    />
                    :
                    <Feather 
                        name="eye"
                        color="grey"
                        size={20}
                    />
                    }
                </TouchableOpacity> */}
            </View>
            
            {passwordError &&
              <Animatable.View
              animation='fadeInLeft'
              duration={500}
              >
                <Text style={{...styles.errorMsg}}>{passwordError}</Text>
              </Animatable.View>
            }
            
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
    onLogin: (email, name, password) => dispatch(handleAuth(email, name, password)),
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
      flex: 3,
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
  }
})
