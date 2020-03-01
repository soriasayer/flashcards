import React, { Component, Fragment } from 'react'
import { StyleSheet, Text, View, Platform, TouchableOpacity, Alert } from 'react-native'
import { white, teal, lightGray, red } from '../utils/colors'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { connect } from 'react-redux'
import { getDailyReminderValue } from '../utils/helpers'
import { SwipeListView } from 'react-native-swipe-list-view'
import { Ionicons, FontAwesome, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons'
import { removeQuestion } from '../actions/deck'
import { quezModal, onEdit } from '../actions/extraAction'
import AddQuestion from './AddQuestion'

class DeckDetail extends Component {
    state = {
        qid: 0,
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
        const { data, id, dispatch, visibleModal } = this.props
        const { qid, qTextInput, aTextInput } = this.state
        
        return(
            <Fragment>
                {visibleModal &&
                 <AddQuestion 
                    id={id}
                    qid={qid}
                    qTextInput={qTextInput}
                    aTextInput={aTextInput}
                />}
                <SwipeListView 
                    closeOnScroll={true}
                    data={data}
                    renderItem={({ item, index }) => (
                        <View key={index}>
                             <View style={[styles.container]}>
                                <View style={styles.deckFont}>
                                    <Text style={{fontSize: 18}}>{item.question}</Text>
                                </View>
                            </View>
                        </View>
                    )}
                    keyExtractor={({item, index}) => index}
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
                                        dispatch(quezModal(true))
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
                    leftOpenValue={75} 
                    rightOpenValue={-150}
                />
                <View style={styles.addBtnContainer}>
                    <TouchableOpacity 
                     style={styles.addBtn}  
                     onPress={() => {
                         dispatch(onEdit('add'))
                         dispatch(quezModal(true))
                        }}>
                        <Ionicons name={Platform.OS === "ios" 
                        ? 'ios-add' : 'md-add'} size={50} style={styles.icons}/>
                    </TouchableOpacity>
                </View>
            </Fragment>
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
    deckFont: {
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
    addBtnContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'flex-start',
        width: wp('90%'),
        height: 100,
        position: 'relative',
    },
    addBtn: {
        width: 60,
        height: 60,
        borderRadius: 50,
        backgroundColor: teal,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        shadowRadius: 3,
        shadowOpacity: 0.8,
        shadowColor: 'rgba(0,0,0,0.24)',
        shadowOffset: {
        width: 0,
        height: 5,
        },
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

export default connect(mapStateToProps)(DeckDetail)