import React, { Component } from 'react'
import { StyleSheet, Text, View, Platform, TouchableOpacity } from 'react-native'
import { white, orange, lightGray, green, red, gray } from '../utils/colors'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'
import { connect } from 'react-redux'

class DeckDetail extends Component {

    handlePress = () => {
        console.log('It works on Android as well!')
    }
    render () {
       
        const { title, questions } = this.props
        return(
            <View style={[styles.container, {flex: 1}]}>
                <View style={styles.deck}>
                    <Text style={styles.deckTitle}>{title}</Text>
                    <Text style={styles.cards}>{`${questions} cards`}</Text>
                </View>
                <View style={styles.btnContainer}>
                    <TouchableOpacity 
                    style={[styles.addBtn, {backgroundColor: green}]} 
                    onPress={() => this.props.navigation.navigate('AddQuestion', {
                        deckTitle: title
                    })}>
                        <Text style={styles.btnText}>Add Card</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.addBtn, {backgroundColor: gray}]}  
                    onPress={() => this.props.navigation.navigate('Question', {deck: title})}>
                        <Text style={styles.btnText}>Start Quiz</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.addBtn, {backgroundColor: red}]}  onPress={this.handlePress}>
                        <Text style={styles.btnText}>Delete Deck</Text>
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
        backgroundColor: orange,
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
    const {deck} = route.params
    
    return {
        title: decks[deck].title,
        questions: decks[deck].questions.length,
    }
}

export default connect(mapStateToProps)(DeckDetail)