import React, { Component } from 'react'
import { StyleSheet, Text, View, Platform, ColorPropType, ScrollView } from 'react-native'
import { white, orange, lightGray} from '../utils/colors'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'

class Decks extends Component {
    render () {
        return(
            <ScrollView >
                <View style={[styles.container, {flex: 1}]}>
                        <View style={styles.deck}>
                        <Text style={styles.deckTitle}>React Native App</Text>
                        <Text style={styles.cards}>3 Cards</Text>
                    </View>
                    <View style={styles.deck}>
                        <Text style={styles.deckTitle}>React.js App</Text>
                        <Text style={styles.cards}>6 Cards</Text>
                    </View>
                    <View style={styles.deck}>
                        <Text style={styles.deckTitle}>JavaScript</Text>
                        <Text style={styles.cards}>10 Cards</Text>
                    </View>
                    <View style={styles.deck}>
                        <Text style={styles.deckTitle}>JavaScript</Text>
                        <Text style={styles.cards}>10 Cards</Text>
                    </View>
                    <View style={styles.deck}>
                        <Text style={styles.deckTitle}>JavaScript</Text>
                        <Text style={styles.cards}>10 Cards</Text>
                    </View>
                </View>
            </ScrollView>
        )
    }
}

export default Decks

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
    },
    deck: {
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        backgroundColor: orange,
        borderRadius: Platform.OS === 'ios' ? 16 : 10,
        width: wp('80%%'),
        height: hp('30%'),
        padding: 20,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 17,
        shadowRadius: 3,
        shadowOpacity: 0.8,
        shadowColor: 'rgba(0,0,0,0.24)',
        shadowOffset: {
        width: 0,
        height: 3,
        },

    },
    deckTitle: {
        fontWeight: 'bold',
        color: white,
        fontSize: 25,
    },
    cards: {
        fontWeight: 'bold',
        color: lightGray,
        fontSize: 15,
    },

})