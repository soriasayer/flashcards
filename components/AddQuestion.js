import React, { Component } from 'react'
import { StyleSheet, Text, View, Platform, TouchableOpacity, TextInput, KeyboardAvoidingView } from 'react-native'
import { white, yellow, green, gray, lightGray } from '../utils/colors'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'
import { connect } from 'react-redux'
import { addQuestion } from '../actions/deck'


class AddQuestion extends Component {
    state = {
        question: '',
        answer: '',
    }

    handlePress = () => {
        const { question, answer } = this.state
        const { dispatch } = this.props
        const { deckTitle } = this.props.route.params
        
        dispatch(addQuestion(deckTitle, question, answer))
       
    }
    render () {
        const { question, answer } = this.state
        
        return(
            <KeyboardAvoidingView style={[styles.container, {flex: 1}]} behavior="padding">
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
        marginTop: 30,
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
        height: 50,
        backgroundColor: white,
        borderColor: gray,
        borderWidth: 1,
        borderRadius: Platform.OS === 'ios' ? 8 : 4,
        fontSize: 22,
        textAlign: 'center',
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