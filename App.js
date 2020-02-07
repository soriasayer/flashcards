import React from 'react';
import { Text, View, Platform, StatusBar, StyleSheet } from 'react-native'
import Decks from './components/Decks'
import DeckDetail from './components/DeckDetail'
import Question from './components/Question'
import NewQuestion from './components/NewQuestion'
import NewDeck from './components/NewDeck';
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { white, orange, gray } from './utils/colors'
import { MaterialIcons, Entypo } from '@expo/vector-icons'
import Constants from 'expo-constants'

function UdaciStatusBar ({ backgroundColor, ...props }) {
  return(
    <View style={ [styles.borderBar ,{backgroundColor, height: Constants.statusBarHeight}] }>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

const Tab = Platform.OS === 'ios' ? createBottomTabNavigator() : createMaterialTopTabNavigator()

function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName='Decks'
      tabBarOptions={{
        activeTintColor: orange,
        style: {
          height: Platform.OS === 'android' ? 58 : 80,
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
          backgroundColor: orange,
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
        name='NewDeck'
        component={NewDeck}
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



export default function App() {
  return (
    <View style={{flex: 1}} accessible>
    <UdaciStatusBar backgroundColor={orange} barStyle="light-content" />
    <NavigationContainer>
      <MyTabs />
    </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  borderBar: {
    borderBottomWidth: Platform.OS === 'ios' ? 2 : 0,
    borderColor: white,
  },
})
