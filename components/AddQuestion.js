import React, { Component } from 'react'
import { StyleSheet, Text, View, Platform, TouchableOpacity, TextInput, KeyboardAvoidingView } from 'react-native'
import { white, yellow, green, gray, lightGray } from '../utils/colors'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'
import { connect } from 'react-redux'
import { addQuestion } from '../actions/deck'
import { CommonActions } from '@react-navigation/native'
import { generateUID } from '../utils/helpers'

class AddQuestion extends Component {
    state = {
        question: '',
        answer: '',
    }

    handlePress = () => {
        const { question, answer } = this.state
        const { dispatch, navigation, route } = this.props
        const { deckId } = route.params
        
        dispatch(addQuestion(deckId, question, answer))
        navigation.dispatch(CommonActions.goBack()) 
    }
    render () {
        const { question, answer } = this.state
        
        return(
            <KeyboardAvoidingView style={[styles.container, {flex: 1}]} behavior="padding" keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0 }>
                <View style={styles.inputContainer}>
                    <Text style={styles.text}>Write a question:</Text>
                    <TextInput style={styles.input} 
                    placeholder='Enter your question' 
                    value={question}
                    onChangeText={(question) => this.setState({question})}
                />
                    <Text style={[styles.text, {marginTop: 40}]}>Write an answer:</Text>
                    <TextInput style={styles.input}
                     placeholder='Enter your answer' 
                     value={answer}
                     onChangeText={(answer) => this.setState({answer})}
                    />
                </View>
                <TouchableOpacity style={styles.submitBtn} onPress={this.handlePress}>
                    <Text style={styles.btnText}>Submit</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        )
    }
}

export default connect()(AddQuestion)

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginTop: 10,
        padding: 20,
    },
    inputContainer: {
        height: 280,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    text: {
        color: gray,
        fontSize: 23,
        fontWeight: 'bold',
        alignSelf: 'flex-start',
    },
    input: {
        width: wp('90%'),
        height: 60,
        backgroundColor: white,
        borderColor: gray,
        borderWidth: 1,
        borderRadius: Platform.OS === 'ios' ? 8 : 4,
        fontSize: 22,
        padding: 15,
    },
    submitBtn: {
        backgroundColor: gray,
        padding: 10,
        height: 60,
        width: 110,
        borderRadius:  Platform.OS === 'ios' ? 8 : 4,
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnText: {
        fontWeight: 'bold',
        color: white,
        fontSize: 23,
    },
})