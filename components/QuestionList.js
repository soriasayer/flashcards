import React, { Component } from 'react'
import { StyleSheet, Text, View, Platform, TouchableOpacity, Alert } from 'react-native'
import { white, teal, lightGray, red, blue } from '../utils/colors'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { connect } from 'react-redux'
import { getDailyReminderValue } from '../utils/helpers'
import { SwipeListView } from 'react-native-swipe-list-view'
import { Ionicons, FontAwesome, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons'
import { removeQuestion } from '../actions/deck'
import { quizModal, onEdit } from '../actions/extraAction'
import AddQuestion from './AddQuestion'
import ActionButton from 'react-native-action-button';

class QuestionList extends Component {
    state = {
        qid: null,
        qTextInput: '',
        aTextInput: '',
    }

    onDeletPress = (qid) => {
        const { dispatch, id } = this.props
        Alert.alert(
            'Delete!',
            'Are you sure you wanna delete this question?',
            [
                {
                text: 'Cancel',
                style: 'cancel',
                },
                {text: 'OK', onPress: () => dispatch(removeQuestion(id, qid))},
            ],
            {cancelable: false},
        )
    }
    
    render () {
        const { data, id, dispatch, visibleModal, navigation } = this.props
        const { qid, qTextInput, aTextInput } = this.state
        
        return(
            <View style={ {flex: 1}}>
                {visibleModal &&
                 <AddQuestion 
                    id={id}
                    qid={qid}
                    qTextInput={qTextInput}
                    aTextInput={aTextInput}
                />}
                <SwipeListView 
                    closeOnRowPress
                    data={data}
                    useFlatList={true}
                    renderItem={({ item, index }) => (
                        <View>
                             <View style={[styles.container]}>
                                <View style={styles.deckFront}>
                                    <Text style={{fontSize: 18}}>{item.question}</Text>
                                </View>
                            </View>
                        </View>
                    )}
                    keyExtractor={(item, index) => index}
                    renderHiddenItem={ ({item, index}) => (
                        <View style={styles.container}>
                            <View style={styles.deckBack}>
                                <TouchableOpacity 
                                style={[styles.buttons, {backgroundColor: red}]}
                                onPress={() => this.onDeletPress(index)}>
                                    <MaterialIcons name='delete' size={30} style={styles.icons}/>
                                </TouchableOpacity>
                                <TouchableOpacity 
                                    style={[styles.buttons, styles.buttonEdit]}
                                    onPress={() => {
                                        dispatch(quizModal(true))
                                        dispatch(onEdit('edit'))
                                        this.setState({qid: index})
                                        this.setState({qTextInput: item.question})
                                        this.setState({aTextInput: item.answer})
                                    }}>
                                    <FontAwesome name='edit' size={30} style={styles.icons}/>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}
                    rightOpenValue={-150}
                />
                
                    <ActionButton buttonColor={red}>
                        <ActionButton.Item style={{position: 'absolute'}} buttonColor={blue} title="Start Quiz" 
                            onPress={() => {navigation.navigate('Question', {deck: id})}}>
                            <FontAwesome name="question" style={styles.actionButtonIcon} />
                        </ActionButton.Item>
                        <ActionButton.Item buttonColor={teal} title="Add Question" onPress={() => {
                            dispatch(onEdit('add'))
                            dispatch(quizModal(true))
                        }}>
                            <MaterialIcons name='add' style={styles.actionButtonIcon} />
                        </ActionButton.Item>
                    </ActionButton>
                </View>
            
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 5,
    },
    deckFront: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        backgroundColor: white,
        borderRadius: 3,
        width: wp('95%'),
        height: hp('10%'),
        padding: 10,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderBottomColor: lightGray,
        borderTopColor: lightGray,
        borderLeftColor: lightGray,
        borderRightColor: lightGray,
        shadowRadius: 3,
        shadowOpacity: 0.8,
        shadowColor: 'rgba(0,0,0,0.24)',
        shadowOffset: {
        width: 0,
        height: 3,
        },
    },
    deckBack: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        backgroundColor: lightGray,
        borderRadius: 3,
        width: wp('95%'),
        height: hp('10%'),
        shadowRadius: 3,
        shadowOpacity: 0.8,
        shadowColor: 'rgba(0,0,0,0.24)',
        shadowOffset: {
        width: 0,
        height: 3,
        },
    },
    buttons: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 75,
        height: hp('10%'),
    },
    buttonEdit: {
        backgroundColor: teal,
        borderTopRightRadius: 3,
        borderBottomRightRadius: 3
    },
    actionButtonIcon: {
        fontSize: 20,
        height: 22,
        color: 'white',
      },
    icons: {
        fontWeight: 'bold',
        alignSelf: 'center',
        color: white,
        padding: 5,
    },
})

function mapStateToProps({decks, visibleModal, openEdit}, {route}) {
    const { deck } = route.params
    
    return {
        data: decks[deck] ? decks[deck].questions : null,
        id: decks[deck] ? decks[deck].id : null,
        visibleModal,
    }
}

export default connect(mapStateToProps)(QuestionList)