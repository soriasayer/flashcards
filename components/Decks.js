import React, { Component } from 'react'
import { FlatList, View, Text, StyleSheet, TouchableHighlight, Alert } from 'react-native'
import FlashCards from './FlashCards'
import { getData } from './FlashCards'
import { connect } from 'react-redux'
import { SwipeListView } from 'react-native-swipe-list-view'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { lightGray, white, teal, red } from '../utils/colors'
import { FontAwesome, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons'
import { removeDeck } from '../actions/deck'
import { visibleModal, inEditMode, setScreenTitle } from '../actions/extraAction'

class Decks extends Component {
    state = {
        textInput: '',
        editedTitle: 0
      }

      setTextInput = (title) => {
          this.setState({textInput: title})
      }

      setEditedItem = (id) => {
          this.setState({editedTitle: id})
      }

    handlePress = (id) => {
        const { dispatch } = this.props
        Alert.alert(
            'Delete',
            'Are you sure you wanna delete this deck?',
            [
                {
                text: 'Cancel',
                style: 'cancel',
                },
                {text: 'OK', onPress: () => dispatch(removeDeck(id))},
            ],
            {cancelable: false},
        )   
    }
   
    render () {
       const {data, dispatch, navigation} = this.props
       const { editedTitle, textInput } = this.state
       
        return(
            <SwipeListView
            useFlatList={true}
            closeOnRowPress={true}
                data={data}
                renderItem={({ item }) => (
                    <FlashCards 
                     id={item.id}
                     title={item.title} 
                     questions={item.questions} 
                     navigation={this.props.navigation}
                     editedTitle={editedTitle}
                     textInput={textInput}
                    />)}
                keyExtractor={item => item.id}
                renderHiddenItem={ ({item}) => (
                    <View style={styles.container}>
                        <View style={styles.backContainer}>
                            <View style={styles.btnContainer}>
                                <TouchableHighlight 
                                onPress={() => this.handlePress(item.id)} 
                                style={[styles.buttons, {backgroundColor: red}]}>
                                    <MaterialIcons name='delete' size={30} style={styles.icons}/>
                                </TouchableHighlight>
                                <TouchableHighlight 
                                onPress={() => {
                                    this.setTextInput(item.title)
                                    this.setEditedItem(item.id)
                                    dispatch(visibleModal(true))}}
                                    style={[styles.buttons, styles.buttonEdit]}
                                    underlayColor={teal}>
                                    <FontAwesome name='edit' size={30} style={styles.icons}/>
                                </TouchableHighlight>
                            </View>
                            <View style={styles.listBtnContainer}>
                            <TouchableHighlight
                            style={[styles.buttons, styles.buttonList]}
                            onPress={() => {
                                dispatch(setScreenTitle(item.title))
                                navigation.navigate('QuestionList', { deck: item.id,}) }}> 
                                    <MaterialCommunityIcons name='view-list' size={30} style={styles.icons}/>
                                </TouchableHighlight>
                            </View>
                        </View>
                    </View>
                )}
                leftOpenValue={75} 
                rightOpenValue={-150}
            />
        )
    }
}

const styles = StyleSheet.create( {
    container: {
    flexDirection: 'column',
    alignItems: 'center',
    paddingRight: 5,
    paddingLeft: 5,
    paddingTop: 10,
    },
    backContainer: {
        flexDirection: 'row-reverse',
        justifyContent: 'space-between',
        backgroundColor: lightGray,
        width: wp('95%'),
        height: 90,
        marginLeft: 10,
        marginRight: 10,
        borderRadius: 3,
        shadowRadius: 3,
        shadowOpacity: 0.8,
        shadowColor: 'rgba(0,0,0,0.24)',
        shadowOffset: {
        width: 0,
        height: 3,
        },
    },
    btnContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        width: wp('48%'),
        height: 90,
    },
    listBtnContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        width: wp('46%'),
        height: 90,
    },
    buttons: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 75,
        height: 90,
    },
    buttonEdit: {
        backgroundColor: teal,
        borderTopRightRadius: 3,
        borderBottomRightRadius: 3
    },
    buttonList: {
        backgroundColor: teal,
        borderTopLeftRadius: 3,
        borderBottomLeftRadius: 3
    },
    icons: {
        alignSelf: 'center',
        color: white,
    },
} )

function mapStateToProps({decks}) {
    const newData = Object.keys(decks).map(deck => decks[deck])
    const data = newData.sort((a, b) => {
        if(a.title < b.title) { return -1; }
        if(a.title >  b.title) { return 1; }
        return 0;
    })
    
    return {
        data,
    }
}

export default connect(mapStateToProps)(Decks)