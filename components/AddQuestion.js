import React, { Component } from 'react'
import { StyleSheet, Text, View, Platform, TouchableOpacity, TextInput, KeyboardAvoidingView } from 'react-native'
import { white, yellow, green, gray, lightGray, teal } from '../utils/colors'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'
import { connect } from 'react-redux'
import { addQuestion, quezModal, editQustion } from '../actions/deck'
import { CommonActions } from '@react-navigation/native'
import { generateUID } from '../utils/helpers'
import Modal from "react-native-modal"

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

    saveEdit = () => {
        const {dispatch, did, qid } = this.props
        const { question, answer } = this.state

        dispatch(editQustion(did, qid, question, answer))
        dispatch(quezModal(false))
    }

    render () {
        const { question, answer } = this.state
        const { edit, qTextInput, aTextInput, dispatch } = this.props
        return(
            <Modal 
                onSwipeComplete={() => dispatch(quezModal(false))}
                swipeDirection="left"
                isVisible={edit}
                backdropOpacity={0.6}
                animationIn={'zoomInDown'}
                animationOut={'zoomOutUp'}
                animationInTiming={1000}
                animationOutTiming={1000}
                backdropTransitionInTiming={1000}
                backdropTransitionOutTiming={1000}>
                <View style={styles.container}>
                    <View style={styles.inputContainer}>
                        <Text style={styles.text}>Write a question:</Text>
                        <TextInput style={styles.input} 
                            autoFocus={true}
                            underlineColorAndroid = "transparent"
                            placeholder='Term...' 
                            defaultValue={qTextInput}
                            onChangeText={(text) => this.setState({question: text})}
                        />
                        <Text style={[styles.text, {marginTop: 40}]}>Write an answer:</Text>
                        <TextInput style={styles.input}
                            autoFocus={true}
                            underlineColorAndroid = "transparent"
                            placeholder='Description...' 
                            defaultValue={aTextInput}
                            onChangeText={(text) => this.setState({answer: text})}
                        />
                    </View>
                        <TouchableOpacity style={styles.submitBtn} onPress={this.saveEdit}>
                            <Text style={styles.btnText}>Submit</Text>
                        </TouchableOpacity>
                </View>
            </Modal>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        height: hp('60%'),
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        backgroundColor: white,
        borderRadius: 4,
    },
    inputContainer: {
        height: hp('35%'),
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    text: {
        color: gray,
        fontSize: 23,
        fontWeight: '500',
        alignSelf: 'flex-start',
    },
    input: {
        width: wp('85%'),
        height: 60,
        backgroundColor: '#FAFAFA',
        borderBottomColor: teal,
        borderBottomWidth: 2,
        fontSize: 20,
        padding: 15,
    },
    submitBtn: {
        width: wp('85%'),
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: teal,
        padding: 10,
        borderRadius:  4,
        marginBottom: 15,
    },
    btnText: {
        fontWeight: 'bold',
        color: white,
        fontSize: 23,
    },
})

function mapStateToProps({edit}) {
    return{
        edit
    }
}

export default connect(mapStateToProps)(AddQuestion)