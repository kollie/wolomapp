import React, { useState, useContext } from 'react'
import { 
  Text, 
  View, 
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Platform,
  TextInput,
  StatusBar,
  Alert
} from 'react-native'

import {LinearGradient} from 'expo-linear-gradient'
import { FontAwesome, Feather } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable'


import { AuthContext } from '../../Constants';
import Users from '../../Users'


const SignIn = ({navigation}) => {

  const [data, setData] = useState({
    email: '',
    password: '',
    check_textInputChange: false,
    secureTextEntry: true,
    isValidEmail: true,
    isValidPassword: true
  })

  const { signIn } = useContext(AuthContext)

  const textInputChange = (val) => {
    if (val.trim().length >= 4) {
      setData({
        ...data,
        email: val,
        check_textInputChange: true,
        isValidEmail: true
      })
    } else {
      setData({
        ...data,
        email: val,
        check_textInputChange: false,
        isValidEmail: false
      })
    }
  }

  const handlePasswordChange = (val) => {
    if (val.trim().length >= 8) {
      setData({
        ...data,
        password: val,
        isValidPassword: true
      })
    } else {
      setData({
        ...data,
        password: val,
        isValidPassword: false
      })
    }    
  }

  const updateSecureTextEntry = () => {
    setData({
      secureTextEntry: !data.secureTextEntry
    })
  }

  const handleValidUser = (val) => {
    if(val.trim().length >= 4) {
      setData({
        ...data,
        isValidEmail: true
      });
    } else {
      setData({
        ...data,
        isValidEmail: false
      })
    }
  }

  const handleLogin = (email, password) => {
    const foundUser = Users.filter(item => {
      return email === item.email && password === item.password
    })

    if (data.email.length === 0 || data.password.length === 0) {
      Alert.alert('Wrong Input', 'Email or password field cannot be empty', [
        {text: 'Okay'}
      ]);
      return
    }

    if (foundUser.length === 0) {
      Alert.alert('Invalid User', 'Invalid email or password', [
        {text: 'Okay'}
      ]);
      return
    }
    signIn(foundUser)
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
                    onChangeText={(val) => textInputChange(val)}
                    onEndEditing={(e) => handleValidUser(e.nativeEvent.text)}
                />
                {data.check_textInputChange ? 
                <Animatable.View
                    animation="bounceIn"
                >
                    <Feather 
                        name="check-circle"
                        color="green"
                        size={20}
                    />
                </Animatable.View>
                : null}
            </View>
            
            {data.isValidEmail ? null :
            <Animatable.View
            animation='fadeInLeft'
            duration={500}
            >
              <Text style={{...styles.errorMsg}}>Email must be 4 characters long</Text>
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
                    secureTextEntry={data.secureTextEntry ? true : false}
                    style={styles.textInput}
                    autoCapitalize="none"
                    onChangeText={(val) => handlePasswordChange(val)}
                />
                <TouchableOpacity
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
                </TouchableOpacity>
            </View>
            
            {data.isValidPassword ? null :
              <Animatable.View
              animation='fadeInLeft'
              duration={500}
              >
                <Text style={{...styles.errorMsg}}>Password must be 8 characters long</Text>
              </Animatable.View>
            }
            
            <View style={styles.button}>
                <TouchableOpacity
                    style={styles.signIn}
                    onPress={() => {handleLogin(data.email, data.password)}}
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
        </Animatable.View>
      </View>
    );
}

export default SignIn

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
