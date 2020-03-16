import React, { Component } from 'react';
import { AppRegistry, Text, View, Platform, StatusBar, StyleSheet, Animated, AsyncStorage, Button, YellowBox } from 'react-native'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import rootReducer from './reducers'
import Constants from 'expo-constants'
import { persistStore, persistReducer } from 'redux-persist'
import { PersistGate } from 'redux-persist/es/integration/react'
import { NavigationContainer } from '@react-navigation/native'
import MyStack from './components/MyStack'
import { statusTeal } from './utils/colors'

function AppStatusBar ({ backgroundColor, ...props }) {
  return(
    <View style={{backgroundColor, height: Constants.statusBarHeight}}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['decks', 'counter', 'result', 'screenName']
}

const persistedReducer = persistReducer(persistConfig, rootReducer)
const store = createStore(persistedReducer)
const persistedStore = persistStore(store)

export default class App extends Component {

  render() {
    console.disableYellowBox = true
    return (
      <Provider store={store} >
        <PersistGate persistor={persistedStore} >
            <View style={{flex: 1}} accessible>
              <AppStatusBar backgroundColor={statusTeal} barStyle="light-content" />
              <NavigationContainer>
                <MyStack />
              </NavigationContainer>
            </View>
        </PersistGate>
      </Provider>
    );
  }
}