import React from 'react'
import { 
    Text, 
    View, 
    StyleSheet,
    Dimensions,
    Image
 } from 'react-native'
import {LinearGradient} from 'expo-linear-gradient'
import { MaterialIcons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as Animatable from 'react-native-animatable'

const Splash = ({navigation}) => {
    return (
      <View style={{ ...styles.container }}>
        <View style={{...styles.header}}>
            <Animatable.View style={{
                height: 140,
                width: 140,
                borderRadius: 50,
                backgroundColor: '#fff',
                alignItems: 'center',
                justifyContent: 'center'
            }}
            animation='bounceIn'
            duration={1500}
            >
                <Image
                source={require('../../assets/wolomapp.jpg')}
                style={{...styles.logo}}
                resizeMode='stretch' 
            />
            </Animatable.View>
        </View>
        <Animatable.View 
            style={{...styles.footer}}
            animation='fadeInUpBig'
        >
            <Text style={{...styles.title}}>Keeping your community clean and safe</Text>
            <Text style={{...styles.text}}>You are just one step away</Text>
            <View style={{...styles.button}}>
                <TouchableOpacity onPress={() => navigation.navigate('SignInScreen')}>
                    <LinearGradient
                        colors={['#ff66c4', '#ff66c4']}
                        style={{...styles.signIn}}
                    >
                        <Text style={{...styles.textSign}}>Get Started Now</Text>
                        <MaterialIcons 
                            name='navigate-next'
                            color='#fff'
                            size={20}
                        />
                    </LinearGradient>
                </TouchableOpacity>
            </View>
        </Animatable.View>
      </View>
    );
}

export default Splash

const {height} = Dimensions.get("screen");
const height_logo = height * 0.28 / 2;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: '#ff66c4'
  },
  header: {
      flex: 2,
      justifyContent: 'center',
      alignItems: 'center'
  },
  footer: {
      flex: 1,
      backgroundColor: '#fff',
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      paddingVertical: 50,
      paddingHorizontal: 30
  },
  logo: {
      width: height_logo,
      height: height_logo
  },
  title: {
      color: '#05375a',
      fontSize: 30,
      fontWeight: 'bold'
  },
  text: {
      color: 'grey',
      marginTop:5
  },
  button: {
      alignItems: 'flex-end',
      marginTop: 30
  },
  signIn: {
      width: 150,
      height: 40,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 20,
      flexDirection: 'row'
  },
  textSign: {
      color: 'white',
      fontWeight: 'bold'
  }
})
