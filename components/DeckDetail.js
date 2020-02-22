import React, { Component } from 'react'
import { StyleSheet, Text, View, Platform, TouchableOpacity, Alert } from 'react-native'
import { white, indigo, lightGray, green, red, gray } from '../utils/colors'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'
import { connect } from 'react-redux'
import { getDailyReminderValue } from '../utils/helpers'

class DeckDetail extends Component {

    isDisabled = () => {
        const { deck } = this.props
        if(deck === null) {
            return true
        } else {
            return false
        }
    }
    
    render () {
        const { deck } = this.props

        return(
            <View style={[styles.container, {flex: 1}]}>
            {deck === null 
                ? <View style={[styles.deck, {backgroundColor: lightGray}]}>
                    <Text style={{fontSize: 20, color: red}}>Oops! you removed the deck.</Text>
                  </View>
                : <View style={styles.deck}>
                    <Text style={styles.deckTitle}>{deck.title}</Text>
                    <Text style={styles.cards}>{`${deck.questions.length} cards`}</Text>
                 </View>}
                <View style={styles.btnContainer}>
                    <TouchableOpacity 
                     style={[styles.addBtn, this.isDisabled() ? {backgroundColor: lightGray} : {backgroundColor: green}]}  
                     onPress={() => this.props.navigation.navigate('AddQuestion', {
                        deckTitle: deck.title
                     })}
                     disabled={this.isDisabled()} 
                    >
                        <Text style={styles.btnText}>Add Card</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                     style={[styles.addBtn, this.isDisabled() ? {backgroundColor: lightGray} : {backgroundColor: gray}]}  
                     onPress={() => this.props.navigation.navigate('Question', {deck: deck.title})}
                     disabled={this.isDisabled()}   
                     >
                        <Text style={styles.btnText}>Start Quiz</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
        padding: 10,
    },
    deck: {
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        backgroundColor: indigo,
        borderRadius: 5,
        width: wp('80%'),
        height: hp('40%'),
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
        fontSize: hp('3.5%'),
    },
    cards: {
        fontWeight: 'bold',
        color: lightGray,
        fontSize: 20,
    },
    btnContainer: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: "center",
        width: wp('80%'),
        height: 170,
    },
    addBtn: {
        padding: 10,
        paddingLeft: 30,
        paddingRight: 30,
        width: wp('80%'),
        height: 45,
        borderRadius:  Platform.OS === 'ios' ? 16 : 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnText: {
        fontWeight: 'bold',
        color: white,
        fontSize: 23,
        textAlign: 'center',
    },

})

function mapStateToProps({decks}, {route}) {
    const { deck } = route.params
    return {
        deck: decks[deck] ? decks[deck] : null,
        title: decks[deck] && decks[deck].title
    }
}

export default connect(mapStateToProps)(DeckDetail)