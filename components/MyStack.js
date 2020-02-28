import React, { Component } from 'react';
import { Text, View, Platform, StatusBar, StyleSheet, Animated, AsyncStorage, Button } from 'react-native'
import Decks from './Decks'
import DeckDetail from './DeckDetail'
import Question from './Question'
import AddQuestion from './AddQuestion'
import AddDeck from './AddDeck';
import Result from './Result'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { createStackNavigator } from '@react-navigation/stack'
import { white, teal, gray, statusTeal } from '../utils/colors'
import { MaterialIcons, Entypo } from '@expo/vector-icons'
import { connect } from 'react-redux';

const Tab = Platform.OS === 'ios' ? createBottomTabNavigator() : createMaterialTopTabNavigator()

function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName='Decks'
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

const forFade = ({ current, next }) => {
    const opacity = Animated.add(
      current.progress,
      next ? next.progress : 0
    ).interpolate({
      inputRange: [0, 1, 2],
      outputRange: [0, 1, 0],
    });
  
    return {
      leftButtonStyle: { opacity },
      rightButtonStyle: { opacity },
      titleStyle: { opacity },
      backgroundStyle: { opacity },
    };
  };

  
const Stack = createStackNavigator();

class MyStack extends Component {
    
  render() {
    const { screenName } = this.props
    return (
      <Stack.Navigator
        initialRouteName="Home"
        headerMode="screen"
        
        screenOptions={{
          headerTintColor: white,
          headerStyle: { 
            backgroundColor: teal, 
            height: 56,
          },
          headerTitleStyle: {
            fontWeight: '600',
            marginBottom: Platform.OS === 'android' ? 20 : 0,
          },
          headerLeftContainerStyle: {
            marginBottom: Platform.OS === 'android' ? 20 : 0,
          }
        }}
      >
      <Stack.Screen
          name='Back'
          component={MyTabs}
          options={{
            title: screenName,
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="DeckDetail"
          component={DeckDetail}
          options={{
            title: Platform.OS === 'ios' ? 'Deck Detail' : screenName,
            headerStyleInterpolator: forFade,
          }}
        />
        <Stack.Screen
          name="Question"
          component={Question}
          options={{
            title: 'Question',
            headerStyleInterpolator: forFade,
          }}
        />
        <Stack.Screen
          name="AddQuestion"
          component={AddQuestion}
          options={{
            title: 'Add Question',
            headerStyleInterpolator: forFade,
          }}
        />
        <Stack.Screen
          name="Result"
          component={Result}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    );
  }
}
  


function mapStatToProps({screenName}) {
    return{
      screenName,
    }
}

export default connect(mapStatToProps)(MyStack)