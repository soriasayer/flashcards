import React, { Component } from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import { white, green, red, gray, lightGreen, lightGray } from '../utils/colors'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'
import { MaterialCommunityIcons} from '@expo/vector-icons'



class ResultList extends Component {
  render() {
      const { resualts } = this.props
      console.log(resualts)
        return (
          <ScrollView>
            <View style={styles.tableContainer} >
                {resualts.map((resualt, index) => (
                    <View key={index} style={styles.table}>
                        <View style={styles.tableNumber} >
                            <Text style={{fontSize: 16, fontWeight: '600'}}>{index + 1}</Text>
                        </View>
                        <View style={styles.tableText}>
                            <Text style={{fontSize: 15,}} >
                                {resualt.question}
                            </Text>
                        </View>
                        <View style={styles.iconContainer}>
                            <MaterialCommunityIcons name='close' size={40} style={{color: red}}/>
                        </View>
                    </View>
                ))}
            </View>
          </ScrollView>     
      )
  }
}

export default ResultList

const styles = StyleSheet.create({
  tableContainer: {
    flexDirection: 'column',
    alignItems: 'stretch',
    width: wp('100%'),
  },
  table: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
    backgroundColor: white,
    width: wp('100%'),
    height: 60,
    padding: 10,
    marginLeft: 10,
    marginRight: 10,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderBottomColor: lightGray,
    borderTopColor: lightGray,
  },
  tableNumber: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 25,
    width: 25,
    backgroundColor: lightGray,
    marginRight: 8,
    marginTop: 8,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: gray,
  },
  tableText: {
    width: wp('70%'),
  },
  iconContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      height: 30,
      width: 30,
      marginRight: 20,
  }

})