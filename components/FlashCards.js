import React, { Component, Fragment } from 'react'
import { StyleSheet, Text, View, Platform, FlatList, TouchableHighlight, TextInput } from 'react-native'
import { white, teal, lightteal, lightGray } from '../utils/colors'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'
import { editDeck, visibleModal } from '../actions/deck'
import { MaterialCommunityIcons, MaterialIcons} from '@expo/vector-icons'
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
         underlayColor={teal}>
          <MaterialCommunityIcons name='check' size={20} style={{color: white}}/>
        </TouchableHighlight>
      </View>
    )
  }

  renderCard = () => {
    if(this.props.questions.length > 1) {
      return 'Cards'
    } else if(this.props.questions.length === 0) {
      return 'No cards'
    } else {
      return 'Card'
    }
  }
    
  render() {
    const {id, title, questions, navigation, visible, dispatch  } = this.props
  
    return(
      <Fragment>
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
        <TouchableHighlight 
          style={[styles.container, {flex: 1}]}
          onPress={() => navigation.navigate('DeckDetail', { 
          deck: id,
          })}>
          
          <View style={styles.deckContainer}>
            <MaterialIcons name='folder' size={60} style={{color: teal}}/>
            <View style={{alignSelf: 'flex-start'}}>
            <Text style={styles.deckTitle}>{title}</Text>
            <Text style={styles.cards}>{`${questions.length} ${this.renderCard()}`}</Text>
            </View>
            
          </View>
        </TouchableHighlight>
      </Fragment>
    )
  }
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
    width: wp( '95%' ),
    height: 90,
    padding: 20,
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
  deckTitle: {
    fontWeight: 'bold',
    color: teal,
    fontSize: 18,
    marginLeft: 20,
    marginBottom: 5,
  },
  cards: {
    fontWeight: 'bold',
    color: lightGray,
    fontSize: 14,
    marginLeft: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: teal,
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