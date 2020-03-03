import React, { Component, Fragment } from 'react'
import { StyleSheet, Text, View, Platform, FlatList, TouchableHighlight, TextInput } from 'react-native'
import { white, teal, lightteal, lightGray } from '../utils/colors'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'
import { editDeck } from '../actions/deck'
import { visibleModal, setScreenTitle } from '../actions/extraAction'
import { MaterialCommunityIcons, Ionicons} from '@expo/vector-icons'
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
        underlineColorAndroid = "transparent"
        defaultValue={textInput}
        onChangeText={(text) => this.setState({newTitle: text})} 
        style={styles.input}/>
        <TouchableHighlight 
         style={styles.button} 
         onPress={this.handleOnPress} 
         underlayColor={teal}>
          <Text style={{fontWeight: 'bold', fontSize: 20, color: white}}>Save</Text>
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
    const {id, title, questions, navigation, visible, dispatch, decks } = this.props
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
          onPress={() => {dispatch(setScreenTitle(title)); questions.length === 0 
            ? navigation.navigate('QuestionList', {deck: id,}) 
            : navigation.navigate('Question', {deck: decks[id] ? decks[id].id : null})}}>
          <View style={styles.deckContainer}>
            <View style={styles.folderContainer}>
              <Ionicons name={Platform.OS === "ios" 
              ? 'ios-folder' : 'md-folder'} size={60} style={{color: teal}}/>
            </View>
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
    paddingTop: 10,
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
  folderContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 80,
    width: 85,
  },
  deckTitle: {
    fontWeight: 'bold',
    color: teal,
    fontSize: 18,
    marginBottom: 5,
  },
  cards: {
    fontWeight: 'bold',
    color: lightGray,
    fontSize: 14,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: wp('85%'),
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: teal,
    padding: 10,
    borderRadius:  4,
    marginTop: 40,
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 40,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  input: {
    width: wp('85%'),
    height: 50,
    backgroundColor: '#FAFAFA',
    borderBottomColor: teal,
    borderBottomWidth: 2,
    fontSize: 20,
    padding: 15,
  },

})

function mapStateToProps({ visible, decks } ) {
  return {
    decks,
    visible,
  }
}

export default connect(mapStateToProps)(FlashCards)