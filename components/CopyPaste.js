import React, { Component } from 'react'
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Platform } from 'react-native';
import { teal, gray, lightGray, white } from '../utils/colors'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { connect } from 'react-redux'
import { addDeckTitle, addQuestion } from '../actions/deck'
import Carousel from 'react-native-snap-carousel'
import { textArray } from '../utils/helpers'

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
        
        for (let step = 1; step < 11; step++) {
           const fetchParam = `https://spreadsheets.google.com/feeds/cells/${spreadsheetId}/${step}/public/full?alt=json`
            
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
          })
          questions.forEach((question, index) => {
            dispatch(addQuestion(deckId, question, answers[index]))
          })
        })
        .catch((e) => {console.warn('Error in import googleshet.',e)})
    }
        
        this.setState({inputText: ''})
    }
    
    render() {
        const data = textArray()
      
        return(
            <View style={[styles.container, {flex: 1}]}>
            <Text style={{fontWeight: 'bold', fontSize: 22, color: gray}}>Swipe for Import Instruction</Text>
                <Carousel
                    enableSnap={true}
                    layout={'tinder'}
                    slideStyle={{alignSelf: 'center'}}
                    ref={(c) => { this._carousel = c; }}
                    data={data}
                    renderItem={({item, index}) => (
                        <View key={index} style={styles.carouselContainer}>
                        <Text style={{fontWeight: 'bold', fontSize: 22, color: white}}>
                            {item.info}
                        </Text>
                            <Text style={[styles.text, {fontWeight: 'bold'}]}>{item.step}</Text>
                            <Text style={styles.text}>{item.text}</Text>
                            
                        </View>
                    )}
                    sliderWidth={Platform.OS === 'ios' ? 350 : 305}
                    itemWidth={Platform.OS === 'ios' ? 340 : 300}
                />
                <TextInput
                    style={styles.input}
                    value={this.state.inputText}
                    placeholder='Paste URL'
                    onChangeText={(text) => {
                        this.setState({inputText: text})
                    }}
                />
                <TouchableOpacity 
                    style={styles.button}
                    onPress={this.handleOnPress}>
                    <Text style={{fontWeight: 'bold', fontSize: 18, color: white}}>Import</Text>
                </TouchableOpacity>
          </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        alignItems: 'center',
        padding: Platform.OS === 'android' ? 15 : 40,
    },
    text: {
        color: white,
        fontSize: 20,
        padding: 10,
    },
    carouselContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: teal,
        borderRadius: 3,
        height: 300,
        shadowRadius: 5,
        shadowOpacity: 0.8,
        shadowColor: 'rgba(0,0,0,0.24)',
        shadowOffset: {
        width: 0,
        height: 3,
        },
    },
    input: {
        width: wp('85%'),
        height: 50,
        backgroundColor: '#FAFAFA',
        borderBottomColor: teal,
        borderBottomWidth: 2,
        fontSize: 18,
        padding: 10,
        margin: Platform.OS === 'ios' ? 20 : 10,
    },
    button: {
        width: wp('85%'),
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: teal,
        borderRadius:  5,
        margin: Platform.OS === 'ios' ? 20 : 10,
      },
  })

export default connect()(CopyPaste)