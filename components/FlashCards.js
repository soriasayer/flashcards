import React, { Component } from 'react'
import { StyleSheet, Text, View, Platform, FlatList, TouchableHighlight, TextInput } from 'react-native'
import { white, indigo, lightindigo, lightGray } from '../utils/colors'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'
import { editDeck, visibleModal } from '../actions/deck'
import { MaterialCommunityIcons} from '@expo/vector-icons'
import { connect } from 'react-redux'
import Modal from "react-native-modal"

class FlashCards extends Component {
  state = {newTitle: ''}

  handleOnPress = () => {
    const { dispatch, editedTitle } = this.props
    const { newTitle } = this.state

    dispatch(visibleModal(false))
    dispatch(editDeck(editedTitle, newTitle))

    this.setState({newTitle: ''})
  }

  _renderModalContent = () => {
    const { textInput } = this.props
    return(
      <View style={styles.modalContent}>
        <TextInput
        autoFocus={true}
        maxLength={200}
        defaultValue={textInput}
        onChangeText={(text) => this.setState({newTitle: text})} 
        style={styles.input}/>
        <TouchableHighlight 
         style={styles.button} 
         onPress={this.handleOnPress} 
         underlayColor={'#f1f1f1'}>
          <MaterialCommunityIcons name='check' size={20} style={{color: white}}/>
        </TouchableHighlight>
      </View>
    )
  }
    
  render() {
    const {id, title, questions, navigation, visible, dispatch  } = this.props
  
    return(
      <View style={[styles.container, {flex: 1}]}>
        <Modal 
         onSwipeComplete={() => dispatch(visibleModal(false))}
         swipeDirection="left"
         isVisible={visible}
         backdropOpacity={0.6}
         animationIn={'zoomInDown'}
         animationOut={'zoomOutUp'}
         animationInTiming={1000}
         animationOutTiming={1000}
         backdropTransitionInTiming={1000}
         backdropTransitionOutTiming={1000}>
         {this._renderModalContent()}
        </Modal>
        <View style={styles.deckContainer}>
        <TouchableHighlight 
          style={styles.deck} 
          onPress={() => navigation.navigate('DeckDetail', { 
          deck: id,
          })}>
          <View style={styles.deckShadow} >
            <Text style={styles.cards}>{questions.length}</Text>
          </View>
          </TouchableHighlight>
            <Text style={styles.deckTitle}>{title}</Text>
          </View>
      </View>
    )}
}


const styles = StyleSheet.create( {
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    padding: 5,
  },
  deckContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: white,
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
  deck: {
    width: 90,
    height: 60,
    backgroundColor: lightindigo,
    borderRadius: 5,
  },
  deckShadow: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: 90,
    height: 60,
    backgroundColor: indigo,
    borderRadius: 5,
    left: 10,
    bottom: 10,
  },
  deckTitle: {
    fontWeight: 'bold',
    color: indigo,
    fontSize: 18,
    alignSelf: 'flex-start',
    marginLeft: 20,
  },
  cards: {
    fontWeight: 'bold',
    color: white,
    fontSize: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: indigo,
    padding: 12,
    margin: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  input: {
    width: '85%',
    height: 40,
    backgroundColor: white,
    borderColor: lightGray,
    borderWidth: 1,
    borderRadius: 2,
    fontSize: 20,
    padding: 10,
  },

})

function mapStateToProps({ visible, textInput, editedTitle } ) {
  return {
    visible,
  }
}

export default connect(mapStateToProps)(FlashCards)