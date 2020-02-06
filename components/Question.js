import React, { Component } from 'react'
import { StyleSheet, Text, View, Platform, TouchableOpacity } from 'react-native'
import { white, yellow, green, red, gray, lightGreen } from '../utils/colors'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'
import FlipCard from 'react-native-flip-card'

class Question extends Component {

    handlePress = () => {
        console.log('It works on Android as well!')
    }

    
    render () {
        return(
            <View style={[styles.container, {flex: 1}]}>
                <Text style={{fontSize: 24}}>2/2</Text>
                <FlipCard 
                    flipHorizontal={true}
                    flipVertical={false}
                    clickable={true}
                    // style={styles.card}
                >
                    <View style={[styles.face, {flex: 1}]}>
                        <Text style={styles.text}>Does Facebook use react?</Text>
                        <TouchableOpacity onPress={this.handlePress}> 
                            <Text style={styles.answerBtn}>Answer</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={[styles.back, {flex: 1}]}>
                        <Text style={styles.text}>
                        Facebook uses React for small parts of its main page. There are some apps built fully with React, but it's not common at FB.
                        </Text>
                        <TouchableOpacity onPress={this.handlePress}> 
                            <Text style={styles.answerBtn}>question</Text>
                        </TouchableOpacity>
                    </View>
                </FlipCard>
                <View style={styles.btnContainer}>
                    <TouchableOpacity style={[styles.addBtn, {backgroundColor: green}]} onPress={this.handlePress}>
                        <Text style={styles.btnText}>Correct</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.addBtn, {backgroundColor: red}]}  onPress={this.handlePress}>
                        <Text style={styles.btnText}>Incorrect</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

export default Question

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 30,
        padding: 20,
    },
    face: {
        backgroundColor: yellow,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: Platform.OS === 'ios' ? 10 : 10,
        width: wp('80%'),
        padding: 20,
        marginTop: 10,
        marginBottom: 40,
        shadowRadius: 3,
        shadowOpacity: 0.8,
        shadowColor: 'rgba(0,0,0,0.24)',
        shadowOffset: {
        width: 0,
        height: 3,
        },
    },
    back: {
        backgroundColor: lightGreen,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: Platform.OS === 'ios' ? 10 : 10,
        width: wp('80%'),
        padding: 20,
        marginTop: 10,
        marginBottom: 40,
        shadowRadius: 3,
        shadowOpacity: 0.8,
        shadowColor: 'rgba(0,0,0,0.24)',
        shadowOffset: {
        width: 0,
        height: 3,
        },
    },
    
    
    text: {
        color: gray,
        fontSize: hp('3.5%'),
    },
    answerBtn: {
        textTransform: 'uppercase',
        fontWeight: 'bold',
        fontSize: 25,
        color: green,
    },
    btnContainer: {
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'stretch',
        width: wp('80%'),
        height: 110,
    },
    addBtn: {
        padding: 10,
        height: 45,
        borderRadius:  Platform.OS === 'ios' ? 4 : 2,
        alignItems: 'center',
    },
    btnText: {
        fontWeight: 'bold',
        color: white,
        fontSize: 23,
        textAlign: 'center',
    },
})