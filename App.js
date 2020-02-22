import React, { Component } from 'react';
import { Text, View, Platform, StatusBar, StyleSheet, Animated, AsyncStorage } from 'react-native'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import rootReducer from './reducers'
import Decks from './components/Decks'
import DeckDetail from './components/DeckDetail'
import Question from './components/Question'
import AddQuestion from './components/AddQuestion'
import AddDeck from './components/AddDeck';
import Result from './components/Result'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { createStackNavigator } from '@react-navigation/stack'
import { white, indigo, gray } from './utils/colors'
import { MaterialIcons, Entypo } from '@expo/vector-icons'
import Constants from 'expo-constants'
import Resultlist from './components/ResultList'
import ResultList from './components/ResultList'
import { persistStore, persistReducer } from 'redux-persist'
import { PersistGate } from 'redux-persist/es/integration/react'
import { setLocalNotification } from './utils/helpers'

function AppStatusBar ({ backgroundColor, ...props }) {
  return(
    <View style={{backgroundColor, height: Constants.statusBarHeight}}>
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
        activeTintColor: indigo,
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
          backgroundColor: indigo,
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

function MyStack() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      headerMode="screen"
      
      screenOptions={{
        headerTintColor: white,
        headerStyle: { 
          backgroundColor: indigo, 
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
        name="Home"
        component={MyTabs}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="DeckDetail"
        component={DeckDetail}
        options={{
          title: 'Deck Detail',
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

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['decks', 'counter', 'result']
}

const persistedReducer = persistReducer(persistConfig, rootReducer)
const store = createStore(persistedReducer)
const persistedStore = persistStore(store)

export default class App extends Component {
  componentDidMount () {
    setLocalNotification()
  }

  render() {
    return (
      <Provider store={store} >
        <PersistGate persistor={persistedStore} >
            <View style={{flex: 1}} accessible>
              <AppStatusBar backgroundColor={'#536DFE'} barStyle="light-content" />
              <NavigationContainer>
                <MyStack />
              </NavigationContainer>
            </View>
        </PersistGate>
      </Provider>
    );
  }
}


