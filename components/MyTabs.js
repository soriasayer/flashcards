import React from 'react'
import { Text, View, Platform, StatusBar, StyleSheet, Animated, AsyncStorage, Button } from 'react-native'
import Decks from './Decks'
import AddDeck from './AddDeck';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { white, teal, gray, statusTeal } from '../utils/colors'
import { MaterialIcons, Entypo } from '@expo/vector-icons'

const Tab = Platform.OS === 'ios' 
    ? createBottomTabNavigator() 
    : createMaterialTopTabNavigator()

function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName='Decks'
      swipeEnabled={false}
      tabBarOptions={{
        activeTintColor: teal,
        style: {
          height: Platform.OS === 'android' ? 56 : 80,
          backgroundColor: white,
          shadowColor: 'rgba(0, 0, 0, 0.24)',
          shadowOffset: {
            height: 0,
            width: 3,
          },
          shadowRadius: 6,
          shadowOpacity: 1,
        },
        labelStyle: {
          fontWeight: Platform.OS === 'android' ? '800' : '500',
          fontSize: Platform.OS === 'android' ? 17 : 10,
        },
        indicatorStyle: {
          backgroundColor: teal,
          height: 2,
        },
      }}
    >
      <Tab.Screen
        name='Decks'
        component={Decks}
        options={{
          tabBarLabel: 'Decks',
          tabBarIcon: ({ color }) => (
            <Entypo name='home' size={32} color={color} style={{marginTop: 3}} />
          ),
        }}
      />
      <Tab.Screen
        name='AddDeck'
        component={AddDeck}
        options={{
          tabBarLabel: 'Add Deck',
          tabBarIcon: ({ color }) => (
            <MaterialIcons name='add-box' size={32} color={color} style={{marginTop: 3}} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default MyTabs