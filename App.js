import React from 'react';
import { Text, View } from 'react-native'
import Decks from './components/Decks'
import DeckDetail from './components/DeckDetail'
import Question from './components/Question'
import NewQuestion from './components/NewQuestion'

export default function App() {
  return (
    <View style={{flex: 1}} accessible>
      <NewQuestion />
    </View>
  );
}

