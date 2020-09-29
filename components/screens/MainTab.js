import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { MaterialIcons, Entypo, Feather } from '@expo/vector-icons';
import { Text } from 'react-native';


import Home from './Home'
import Details from './Details'
import Profile from './Profile'
import Notifications from './Notifications'


const HomeStack = createStackNavigator()
const DetailsStack = createStackNavigator()
const ProfileStack = createStackNavigator()
const NotificationsStack = createStackNavigator()
const Tab = createMaterialBottomTabNavigator()
const ModalTab = createMaterialBottomTabNavigator()


const MainTabScreen = () => (
    <Tab.Navigator
      initialRouteName="Feed"
      activeColor="#03989e"
      barStyle={{ backgroundColor: '#f9f9f9', height: 45 }}      
    >
      <Tab.Screen
        name="Feed"
        component={HomeStackScreen}
        options={{
          //tabBarBadge: 'hello',
          tabBarLabel: '',
          tabBarIcon: ({ color }) => (
            <Entypo name="home" color={color} size={30} />
          ),  
        }}
      />
      {/* <Tab.Screen
        name="Notifications"
        component={Modal}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ color }) => (
            <Feather name="plus-square" color={color} size={26} />
          ),
        }}
      /> */}
      <Tab.Screen
        name="Profile"
        component={ProfileStackScreen}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="done-all" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
)

export default MainTabScreen

const Modal = () => (
  <ModalTab.Navigator>
    <ModalTab.Screen name='name' component={Notifications} />
  </ModalTab.Navigator>
)


const HomeStackScreen = ({navigation}) => (
    <HomeStack.Navigator screenOptions={{
        headerStyle: {
            backgroundColor: '#f0f0f0',
            height: 100
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: '700'
        },
        
    }}>
        <HomeStack.Screen name='Home' component={Home} options={{
            title: '',
            headerLeft: () => (
              <Text style={{
                fontWeight: '700', 
                fontSize: 25, 
                margin: 10, 
                color: '#03989e'}}>Wolomapp</Text>
            ),
            headerRight: () => (
              <MaterialIcons name="account-circle" size={30} 
                color='#777777'
                style={{
                    margin: 10
                }}
                onPress={() => navigation.navigate('Details')}
                ></MaterialIcons>
            )
        }} />
        <HomeStack.Screen name='Details' component={Details} options={{
          title: '',
          headerStyle: {
            backgroundColor: '#f0f0f0',
            height: 80
        },
        headerTintColor: '#03989e',
        headerBackTitle: (<Text style={{fontSize: 30, margin: 10}}>Israel Z Kollie</Text>),
        headerRight: () => (
          <MaterialIcons name="edit" size={26} 
            color='#777777'
            style={{
                margin: 10
            }}
            onPress={() => navigation.navigate('Details')}
            ></MaterialIcons>
        )
        }} />
        <HomeStack.Screen name='Notifications' component={Notifications} options={{
          title: '',
          headerLeft: () => (
            <Text onPress={() => navigation.navigate('Home')} style={{
              margin: 10,
              fontSize: 16,
              color: '#03989e'}}>Cancel</Text>
          ),
          headerStyle: {
            backgroundColor: '#f0f0f0',
            height: 80
        },
        headerTintColor: '#03989e',
        }} />
    </HomeStack.Navigator>
)

const ProfileStackScreen = ({navigation}) => (
    <ProfileStack.Navigator screenOptions={{
        headerStyle: {
            backgroundColor: '#03989e'
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: '700'
        }
    }}>
        <ProfileStack.Screen name='Profile' component={Profile} options={{
            title: 'Profile'
        }} />
    </ProfileStack.Navigator>
)

const NotificationsStackScreen = ({navigation}) => (
    <NotificationsStack.Navigator screenOptions={{
        headerStyle: {
            backgroundColor: '#03989e'
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: '700'
        },
    }}>
        <NotificationsStack.Screen name='Notifications' component={Modal} options={{
            title: 'Notifications',
        }} />
    </NotificationsStack.Navigator>
)
