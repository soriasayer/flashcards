import React, { Component } from 'react'
import { StyleSheet, Text, View, Platform, FlatList, TouchableOpacity, TextInput } from 'react-native'
import { white, indigo, lightindigo, lightGray } from '../utils/colors'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'
import { editDeck, visibleModal } from '../actions/deck'
import { MaterialCommunityIcons} from '@expo/vector-icons'
import { connect } from 'react-redux'
import Modal from "react-native-modal"

class FlashCards extends Component {
  state = {
    text: this.props.title,
  }

  handleOnPress = () => {
    const { dispatch, title } = this.props
    const {text} = this.state 
    
    dispatch(editDeck(title, text))
    dispatch(visibleModal(false))
  }

  _renderModalContent = () => {
    const {text} = this.state
    
    return(
      <View style={styles.modalContent}>
        <TextInput
        autoFocus={true}
        style={styles.input}
        value={text}
        onChangeText={(text) => this.setState({text})}/>
        <TouchableOpacity style={styles.button} onPress={this.handleOnPress} >
          <MaterialCommunityIcons name='check' size={20} style={{color: white}}/>
        </TouchableOpacity>
      </View>
    )
  }
    
  render() {
    
    const {title, questions, navigation, isInEditMode, visible } = this.props
    return(
        <View style={[styles.container, {flex: 1}]}>
            <View style={styles.deckContainer}>
            <TouchableOpacity 
             style={styles.deck} 
             onPress={() => navigation.navigate('DeckDetail', { 
              deck: title,
             })}>
              <View style={styles.deckShadow} >
                <Text style={styles.cards}>{questions.length}</Text>
              </View>
            </TouchableOpacity>
            {isInEditMode === title
              ? <View style={styles.modalContainer}>
                  <Modal 
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
                </View> 
              : <Text style={styles.deckTitle}>{title}</Text>}
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
    width: 150,
    height: 40,
    backgroundColor: white,
    borderColor: lightGray,
    borderWidth: 1,
    borderRadius: 2,
    fontSize: 20,
    textAlign: 'center',
  },

})

function mapStateToProps({visible} ) {
  return {
      visible
  }
}

export default connect(mapStateToProps)(FlashCards)