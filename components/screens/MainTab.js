import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Ionicons } from '@expo/vector-icons';


import Home from './Home'
import Details from './Details'
import Profile from './Profile'
import Notifications from './Notifications'


const HomeStack = createStackNavigator()
const DetailsStack = createStackNavigator()
const ProfileStack = createStackNavigator()
const NotificationsStack = createStackNavigator()
const Tab = createMaterialBottomTabNavigator();

const MainTabScreen = () => (
    <Tab.Navigator
      initialRouteName="Feed"
      activeColor="#fff"
    >
      <Tab.Screen
        name="Feed"
        component={HomeStackScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarColor: '#03989e',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Details"
        component={DetailsStackScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarColor: '#5271ff',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Notifications"
        component={NotificationsStackScreen}
        options={{
          tabBarLabel: 'Updates',
          tabBarColor: '#ff5757',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="bell" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileStackScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarColor: '#cb6ce6',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
)

export default MainTabScreen


const HomeStackScreen = ({navigation}) => (
    <HomeStack.Navigator screenOptions={{
        headerStyle: {
            backgroundColor: '#03989e'
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: '700'
        }
    }}>
        <HomeStack.Screen name='Home' component={Home} options={{
            title: 'Feed',
            headerLeft: () => (
                <Ionicons name="ios-menu" size={25} 
                backgroundColor="#03989e"
                color='#fff'
                onPress={() => navigation.openDrawer()}
                style={{
                    margin: 10
                }}
                ></Ionicons>
            )
        }} />
    </HomeStack.Navigator>
)

const DetailsStackScreen = ({navigation}) => (
    <DetailsStack.Navigator screenOptions={{
        headerStyle: {
            backgroundColor: '#03989e'
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: '700'
        }
    }}>
        <DetailsStack.Screen name='Details' component={Details} options={{
            title: 'Details',
            headerLeft: () => (
                <Ionicons name="ios-menu" size={25} 
                backgroundColor="#03989e" 
                onPress={() => navigation.openDrawer()}
                color='#fff'
                style={{
                    margin: 10
                }}
                ></Ionicons>
            )
        }} />
    </DetailsStack.Navigator>
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
        }
    }}>
        <NotificationsStack.Screen name='Notifications' component={Notifications} options={{
            title: 'Notifications'
        }} />
    </NotificationsStack.Navigator>
)
