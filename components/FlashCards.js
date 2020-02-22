import React, { Component } from 'react'
import { StyleSheet, Text, View, Platform, FlatList, TouchableOpacity } from 'react-native'
import { white, orange, lightOrange } from '../utils/colors'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'

function FlashCards ({title, questions, navigation }) {
  
    return(
        <View style={[styles.container, {flex: 1}]}>
            <TouchableOpacity 
             style={styles.deckContainer}
             onPress={() => navigation.navigate('DeckDetail', { 
               deck: title,
              })}
            >
            <View style={styles.deck} >
              <View style={styles.deckShadow} >
                <Text style={styles.cards}>{questions.length}</Text>
              </View>
            </View>
            <Text style={styles.deckTitle}>{title}</Text>
            </TouchableOpacity>
        </View>
    )
}

export default FlashCards

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