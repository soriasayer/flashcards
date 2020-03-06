import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import ProgressCircle from 'react-native-progress-circle'
import { white, yellow, teal, red, gray, lightGreen, lightGray, lightteal } from '../utils/colors'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'
import { MaterialCommunityIcons} from '@expo/vector-icons'
import ResultList from './ResultList'
import { connect } from 'react-redux'
import { restartQuestion, cleanResult } from '../actions/extraAction'
import { clearNotification, setLocalNotification } from '../utils/helpers'

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
    const precentage = (totalCorrect.length/result.length) * 100

    clearNotification()
      .then(setLocalNotification)
    
      return (
        <View style={[styles.container, {flex: 1}]}>
          <Text style={styles.title}>Result</Text>
          <ProgressCircle
          outerCircleStyle={{margin: 25}} 
            percent={precentage}
            radius={60}
            borderWidth={10}
            color={teal}
            shadowColor={red}
            bgColor='#B2DFDB'
        >
            <Text style={{ fontSize: 18 }}>{`${Math.round(precentage)}%`}</Text>
        </ProgressCircle>
          <ResultList results={result} />
          <View style={styles.btnContainer}>
            <TouchableOpacity style={[styles.addBtn, {backgroundColor: teal}]} onPress={this.restartQuiz}>
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
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
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