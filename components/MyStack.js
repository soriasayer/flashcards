import React, { Component } from 'react';
import { Text, View, Platform, StatusBar, StyleSheet, Animated, AsyncStorage, Button } from 'react-native'
import Decks from './Decks'
import DeckDetail from './DeckDetail'
import Question from './Question'
import AddQuestion from './AddQuestion'
import Result from './Result'
import { createStackNavigator } from '@react-navigation/stack'
import { white, teal, gray, statusTeal } from '../utils/colors'
import { connect } from 'react-redux';
import MyTabs from './MyTabs'

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

  
const Stack = createStackNavigator()
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
        {/*<Stack.Screen
          name="AddQuestion"
          component={AddQuestion}
          options={{
            title: 'Add Question',
            headerStyleInterpolator: forFade,
          }}
        />*/}
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