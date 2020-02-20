import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { ProgressCircle } from 'react-native-svg-charts'
import { white, yellow, green, red, gray, lightGreen, lightGray } from '../utils/colors'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'
import { MaterialCommunityIcons} from '@expo/vector-icons'
import ResultList from './ResultList'
import { connect } from 'react-redux'
import { restartQuestion, cleanResult } from '../actions/deck'

class Result extends Component {
  restartQuiz = () => {
    const { dispatch, navigation } = this.props
    dispatch(restartQuestion())
    dispatch(cleanResult())

    navigation.navigate('Question')
  }

  backToDeck = () => {
    const { dispatch, navigation } = this.props
    dispatch(restartQuestion())
    dispatch(cleanResult())

    navigation.navigate('Decks')
  }

  render() {
    const { result } = this.props
    const totalCorrect = result.filter(correct => correct.isTtrue)
    const precentage = (totalCorrect.length/result.length) * 1
    
      return (
        <View style={[styles.container, {flex: 1}]}>
          <Text style={styles.title}>Result</Text>
          <ProgressCircle
            style={ { height: 120, marginBottom: 20} }
            progress={ precentage }
            progressColor={green}
            backgroundColor={red}
            strokeWidth={15}
            cornerRadius={1}
          />
          <ResultList results={result} />
          <View style={styles.btnContainer}>
            <TouchableOpacity style={[styles.addBtn, {backgroundColor: green}]} onPress={this.restartQuiz}>
                <Text style={styles.btnText}>Restart Quiz</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.addBtn, {backgroundColor: red}]}  onPress={this.backToDeck}>
                <Text style={styles.btnText}>Back to Deck</Text>
            </TouchableOpacity>
          </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    padding: 10,
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    alignSelf: 'center',
    marginBottom: 10,
  },
  btnContainer: {
    flexDirection: 'column',
    alignSelf: "center",
    width: wp('80%'),
    height: 130,
    marginTop: 20,
  },
  addBtn: {
      padding: 10,
      paddingLeft: 30,
      paddingRight: 30,
      width: wp('80%'),
      height: 45,
      borderRadius:  Platform.OS === 'ios' ? 16 : 10,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 15,
  },
  btnText: {
      fontWeight: 'bold',
      color: white,
      fontSize: 23,
      textAlign: 'center',
  },
})

function mapStateToProps({result}) {
  return {
    result
  }
}

export default connect(mapStateToProps)(Result)