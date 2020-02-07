import React, { Component } from 'react'
import { StyleSheet, Text, View, Platform, TouchableOpacity, TextInput, KeyboardAvoidingView } from 'react-native'
import { white, yellow, green, gray, lightGray } from '../utils/colors'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'

class NewQuestion extends Component {

    handlePress = () => {
        console.log('It works on Android as well!')
    }
    render () {
        return(
            <KeyboardAvoidingView style={[styles.container, {flex: 1}]} behavior="padding">
                <View style={styles.inputContainer}>
                    <Text style={styles.text}>Write a question:</Text>
                    <TextInput style={styles.input} placeholder='Enter your question' />
                    <Text style={[styles.text, {marginTop: 40}]}>Write an answer:</Text>
                    <TextInput style={styles.input} placeholder='Enter your answer' />
                </View>
                <TouchableOpacity style={styles.submitBtn} onPress={this.handlePress}>
                    <Text style={styles.btnText}>Submit</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        )
    }
}

export default NewQuestion

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