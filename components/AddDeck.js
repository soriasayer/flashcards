import React, { Component } from 'react'
import { StyleSheet, Text, View, Platform, TouchableOpacity, TextInput, KeyboardAvoidingView, ScrollView } from 'react-native'
import { white, gray, lightGray } from '../utils/colors'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'
import { connect } from 'react-redux'
import { addDeckTitle } from '../actions/deck'

class AddDeck extends Component {
    state = {
        title: ''
    }

       
    handlePress = () => {
        const { title } = this.state
        const { dispatch, navigation } = this.props
        
        dispatch(addDeckTitle(title))
        navigation.navigate('Decks')
        this.setState({title: ''})
    }

    render () {
        
        const { title } = this.state
        
        return(
            <KeyboardAvoidingView style={[styles.container, {flex: 1}]} behavior="padding" keyboardVerticalOffset={80}>
                <View style={styles.inputContainer}>
                    <Text style={styles.text}>What is the title of your new deck?</Text>
                    <TextInput style={styles.input}
                    placeholder='Enter the deck title'
                    value={title}
                    onChangeText={(title) => this.setState({title})}
                    />
                </View>
                <TouchableOpacity style={styles.submitBtn} onPress={this.handlePress}>
                    <Text style={styles.btnText}>Submit</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        )
    }
}



export default connect()(AddDeck)

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginTop: 30,
        padding: 20,
    },
    inputContainer: {
        height: 150,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    text: {
        color: gray,
        fontSize: 23,
        fontWeight: 'bold',
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