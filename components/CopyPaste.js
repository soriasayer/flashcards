import React, { Component } from 'react'
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';
import { teal, gray, lightGray, white } from '../utils/colors'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { connect } from 'react-redux'
import { addDeckTitle, addQuestion } from '../actions/deck'


class CopyPaste extends Component {
    state={ 
        inputText: ''
    }

    handleOnPress = () => {
        const { dispatch } = this.props
        const { inputText } = this.state

        const resourceUrl = inputText
        const spreadsheetId = new RegExp("/spreadsheets/d/([a-zA-Z0-9-_]+)").exec(resourceUrl)[1];
        const sheetId = new RegExp("[#&]gid=([0-9]+)").exec(resourceUrl)[1]
        const fetchParam = `https://spreadsheets.google.com/feeds/cells/${spreadsheetId}/2/public/full?alt=json`
        
        fetch(fetchParam)
        .then(data => data.json())
        .then(json => {
          let deckTitle = addDeckTitle(json.feed.title["$t"])
           let deckId = deckTitle.did
          dispatch(deckTitle)
          let questions = []
          let answers = []
          json.feed.entry.map((entry, index) => {
            if (index % 2 === 0) {
              questions.push(entry.content["$t"]);
            } else {
              answers.push(entry.content["$t"]);
            }
          });
          questions.forEach((question, index) => {
            dispatch(addQuestion(deckId, question, answers[index]))
          })
        })
        this.setState({inputText: ''})
    }
    
    render() {
        return(
            <View style={[styles.container, {flex:1}]}>
                <Text style={[styles.text, {fontWeight: 'bold'}]}>Steps:</Text>
                <Text style={styles.text}>Step 1: On your computer go to sheets.google.com</Text>
                <Text style={styles.text}>Step 2: Create a new sheet.</Text>
                <Text style={styles.text}>Step 3: Rename Sheet1 to English Words.</Text>
                <Text style={styles.text}>Step 4: On column A1 write Questions and on A2 write Answers.</Text>
                <Text style={styles.text}>Step 5: Write the list of English words and their answers one per row.</Text>
                <Text style={styles.text}>Step 6: Go to file menu and click on "Publish to the Web" and then Click on Publish.</Text>
                <Text style={styles.text}>Step 7: Close “Publish to the web” dialog.</Text>
                <Text style={styles.text}>Step 8: Copy the google sheet URL from the browser address bar.</Text>
                <Text style={styles.text}>Step 9: Send the URL your phone for example via Facebook Messenger.</Text>
                <Text style={styles.text}>Step 10: Paste the URL into the following text box.</Text>
                <TextInput
                    style={styles.input}
                    value={this.state.inputText}
                    onChangeText={(text) => {
                        this.setState({inputText: text})
                    }}
                />
                <Text style={styles.text}>Step 11: Click on the following button.</Text>
                <TouchableOpacity 
                    style={styles.button}
                    onPress={this.handleOnPress}>
                    <Text style={{fontWeight: 'bold', fontSize: 18, color: white}}>Import</Text>
                </TouchableOpacity>
                <Text style={styles.text}>Step 12: If the import is successful, you can find all your flash cards in the app.</Text>
                <Text style={styles.text}>
                Note: Each
                sheet is considered as a Deck and each row in that sheet is considered as a flashcard. Hence you can import multiple decks in one import.
                </Text>
          </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        padding: 20,
    },
    text: {
        alignSelf: 'flex-start',
        color: gray,
        fontSize: 15,
        padding: 3,
    },
    input: {
        width: wp('85%'),
        height: 50,
        backgroundColor: '#FAFAFA',
        borderBottomColor: teal,
        borderBottomWidth: 2,
        fontSize: 20,
        padding: 10,
        margin: 10,
    },
    button: {
        width: wp('85%'),
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: teal,
        borderRadius:  4,
        margin: 10,
      },
  })

export default connect()(CopyPaste)