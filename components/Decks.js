import React, { Component } from 'react'
import { FlatList, View, Text, StyleSheet, TouchableHighlight, Alert } from 'react-native'
import FlashCards from './FlashCards'
import { getData } from './FlashCards'
import { connect } from 'react-redux'
import { SwipeListView, SwipeRow } from 'react-native-swipe-list-view'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'
import { lightGray, white, indigo, red } from '../utils/colors'
import { FontAwesome, MaterialIcons } from '@expo/vector-icons'
import { removeDeck, visibleModal, inEditMode } from '../actions/deck'

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
       const {data, dispatch} = this.props
       const { editedTitle, textInput } = this.state
       
        return(
            <SwipeListView
            useFlatList={true}
            closeOnRowBeginSwipe={true}
                data={data}
                renderItem={({ item }) => (
                    <FlashCards 
                     id={item.id}
                     title={item.title} 
                     questions={item.questions} 
                     navigation={this.props.navigation}
                     editedTitle={editedTitle}
                     textInput={textInput}
                    />
                    )}
                keyExtractor={item => item.id}
                renderHiddenItem={ ({item}) => (
                    <View style={styles.container}>
                        <View style={styles.backContainer}>
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
                         style={[styles.buttons, {backgroundColor: indigo}]}
                         underlayColor={'#f1f1f1'}>
                            <FontAwesome name='edit' size={30} style={styles.icons}/>
                        </TouchableHighlight>
                        </View>
                    </View>
                )}
                leftOpenValue={150} 
                rightOpenValue={-150}
            />
        )
    }
}

const styles = StyleSheet.create( {
    container: {
        flexDirection: 'row',
        alignItems: Platform.OS === 'ios' ? 'flex-end' : 'flex-start',
        padding: 5,
    },
    backContainer: {
        flexDirection: 'row',
        justifyContent: Platform.OS === 'ios' ? 'flex-end' : 'flex-start',
        alignItems: Platform.OS === 'ios' ? 'flex-end' : 'flex-start',
        backgroundColor: lightGray,
        width: wp( '100%' ),
        height: 100,
        padding: 20,
        marginLeft: 10,
        marginRight: 10,
        shadowRadius: 3,
        shadowOpacity: 0.8,
        shadowColor: 'rgba(0,0,0,0.24)',
        shadowOffset: {
            width: 0,
            height: 3,
        },
    },
    buttons: {
        alignSelf: "center",
        justifyContent: 'center',
        width: 70,
        height: 100,
    },
    icons: {
        alignSelf: 'center',
        color: white,
    }
} )

function mapStateToProps({decks}) {
    const data = Object.keys( decks ).map( deck => decks[ deck ] )
    return {
        data,  
    }
}

export default connect( mapStateToProps )( Decks )