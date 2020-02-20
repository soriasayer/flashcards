import React, { Component } from 'react'
import { StyleSheet, Text, View, Platform, TouchableOpacity } from 'react-native'
import { white, yellow, green, red, gray, lightGreen } from '../utils/colors'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'
import FlipCard from 'react-native-flip-card'
import { MaterialCommunityIcons} from '@expo/vector-icons'
import { connect } from 'react-redux'
import { currentCard, showResult } from '../actions/deck'

class Question extends Component {
    
    pressCheck = () => {
        const { dispatch, currentQuestion } = this.props
        const question = currentQuestion && currentQuestion.question
        const answer = currentQuestion && currentQuestion.answer
         
        dispatch(currentCard())
        dispatch(showResult(question, true, answer))

    }
    pressClose = () => {
        const { dispatch, currentQuestion } = this.props
        const question = currentQuestion && currentQuestion.question
        const answer = currentQuestion && currentQuestion.answer
         
        dispatch(currentCard())
        dispatch(showResult(question, false, answer))

    }

    render () {
        const { questions, currentQuestion, counter, navigation, deck } = this.props

        return(
            <View style={[styles.container, {flex: 1}]}>
                <Text style={{fontSize: 24}}>{`${counter+1}/${questions.length}`}</Text>
                <FlipCard 
                    flipHorizontal={true}
                    flipVertical={false}
                    clickable={true}
                >
                    <View style={[styles.face, {flex: 1}]}>
                        <Text style={styles.text}>{currentQuestion && currentQuestion.question}</Text>
                        <TouchableOpacity > 
                            <Text style={styles.answerBtn}>Answer</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={[styles.back, {flex: 1}]}>
                        <Text style={styles.text}>
                        {currentQuestion && currentQuestion.answer}
                        </Text>
                        <TouchableOpacity > 
                            <Text style={styles.answerBtn}>question</Text>
                        </TouchableOpacity>
                    </View>
                </FlipCard>
                <View style={styles.btnContainer}>
                    <TouchableOpacity 
                    style={[styles.addBtn, {backgroundColor: red}]} 
                    onPress={counter === questions.length 
                        ? navigation.navigate('Result') 
                        : this.pressClose}>
                        <MaterialCommunityIcons name='close' size={30} style={{color: white}}/>
                    </TouchableOpacity>
                    <TouchableOpacity 
                     style={[styles.addBtn, {backgroundColor: green}]}  
                     onPress={counter === questions.length 
                        ? navigation.navigate('Result', {deck}) 
                        : this.pressCheck}>
                        <MaterialCommunityIcons name='check' size={30} style={{color: white}}/>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        alignItems: 'center',
        padding: 10,
    },
    face: {
        backgroundColor: yellow,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: Platform.OS === 'ios' ? 10 : 10,
        width: wp('80%'),
        padding: 20,
        marginTop: 10,
        marginBottom: 40,
        shadowRadius: 3,
        shadowOpacity: 0.8,
        shadowColor: 'rgba(0,0,0,0.24)',
        shadowOffset: {
        width: 0,
        height: 3,
        },
    },
    back: {
        backgroundColor: lightGreen,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: Platform.OS === 'ios' ? 10 : 10,
        width: wp('80%'),
        padding: 20,
        marginTop: 10,
        marginBottom: 40,
        shadowRadius: 3,
        shadowOpacity: 0.8,
        shadowColor: 'rgba(0,0,0,0.24)',
        shadowOffset: {
        width: 0,
        height: 3,
        },
    },
    text: {
        color: gray,
        fontSize: hp('3.5%'),
    },
    answerBtn: {
        textTransform: 'uppercase',
        fontWeight: 'bold',
        fontSize: 25,
        color: green,
    },
    btnContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        width: wp('50%'),
        height: 110,
        marginBottom: 8,
    },
    addBtn: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        height: 60,
        width: 60,
        borderRadius:  100,
    },
    
})

function mapStateToProps({decks, counter}, {route}) {
    const { deck } = route.params
    
    return {
        questions: decks[deck].questions,
        currentQuestion: decks[deck].questions[counter],
        counter,
        
    }
}

export default connect(mapStateToProps)(Question)