import React, { Component } from 'react'
import { StyleSheet, Text, View, Platform, FlatList, TouchableOpacity } from 'react-native'
import { white, orange, lightOrange } from '../utils/colors'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'

const data = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'React Native App',
      card: '10',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'React.js App',
      card: '6',
    },
    {
      id: '58694a0f-3da1-471f-bd96-14b71e29d72',
      title: 'JavaScript',
      card: '2',
    },
    {
      id: '58694a0f-3da1-471f-bd96-14571e29d73',
      title: 'JavaScript',
      card: '7',
    },
    {
      id: '58694a0f-3da1-471f-bd96-14371e29d74',
      title: 'JavaScript',
      card: '9',
    },
    {
      id: '58694a0f-3da1-471f-bd96-14wefdfe29d74',
      title: 'JavaScript',
      card: '9',
    },
    {
      id: '58694a0f-3da1-471f-bd96-1hdfghde29d74',
      title: 'JavaScript',
      card: '9',
    },
    {
      id: '58694a0f-3da1-471f-bd96sgfgs1e29d74',
      title: 'JavaScript',
      card: '9',
    },
  ];

  export function getData() {
      return data
  }
  
export function FlashCards ({ id, title, card, navigation }) {

    return(
        <View style={[styles.container, {flex: 1}]}>
            <TouchableOpacity 
             key={id} 
             style={styles.deckContainer}
             onPress={() => navigation.navigate('DeckDetail')}
            >
            <View style={styles.deck} >
              <View style={styles.deckShadow} >
                <Text style={styles.cards}>{card}</Text>
              </View>
            </View>
            <Text style={styles.deckTitle}>{title}</Text>
            </TouchableOpacity>
        </View>
    )
    
}



const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        alignItems: 'center',
        padding: 5,
    },
    deckContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: white,
        width: wp('100%'),
        height: 100,
        padding: 20,
        marginLeft: 10,
        marginRight: 10,
        shadowRadius: 3,
        shadowOpacity: 0.8,
        shadowColor: 'rgba(0,0,0,0.24)',
        shadowOffset: {
        width: 0,
        height: 3,
        },

    },
    deck: {
      width: 90,
      height: 60,
      backgroundColor: lightOrange,
      borderRadius: 5,
    },
    deckShadow: {
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      width: 90,
      height: 60,
      backgroundColor: orange,
      borderRadius: 5,
      left: 10,
      bottom: 10,
    },
    deckTitle: {
        fontWeight: 'bold',
        color: orange,
        fontSize: 18,
        alignSelf: 'flex-start',
        marginLeft: 20,
    },
    cards: {
        fontWeight: 'bold',
        color: white,
        fontSize: 20,
    },

})