import React, { Component } from 'react'
import { FlatList, View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import FlashCards from './FlashCards'
import { getData } from './FlashCards'
import { connect } from 'react-redux'
import { SwipeListView, SwipeRow } from 'react-native-swipe-list-view'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'
import { lightGray, white, indigo, red } from '../utils/colors'
import { FontAwesome, MaterialIcons } from '@expo/vector-icons'
import { removeDeck, visibleModal } from '../actions/deck'

class Decks extends Component {
    state = {
        isInEditMode: ''
    }

    onEdit = (title) => {
        const { dispatch } = this.props
        this.setState({isInEditMode: title})
        dispatch(visibleModal(true))
    }

    handlePress = (title) => {
        const { dispatch } = this.props
        Alert.alert(
            'Delete',
            'Are you sure you wanna delete this deck?',
            [
                {
                text: 'Cancel',
                style: 'cancel',
                },
                {text: 'OK', onPress: () => dispatch(removeDeck(title))},
            ],
            {cancelable: false},
        )   
    }
   
    render () {
       const { isInEditMode, visibleModal } = this.state 
       const {data} = this.props
        
        return(
            <SwipeListView
            
            useFlatList={true}
            closeOnRowBeginSwipe={true}
                data={data}
                renderItem={({ item }) => (
                    <FlashCards 
                     title={item.title} 
                     questions={item.questions} 
                     navigation={this.props.navigation}
                     isInEditMode={isInEditMode}
                     visibleModal={visibleModal}
                    />
                    )}
                keyExtractor={item => item.title}
                renderHiddenItem={ ({item}) => (
                    <View style={styles.container}>
                        <View style={styles.backContainer}>
                        <TouchableOpacity 
                         onPress={() => this.handlePress(item.title)} 
                         style={[styles.buttons, {backgroundColor: red}]}>
                            <MaterialIcons name='delete' size={30} style={styles.icons}/>
                        </TouchableOpacity>
                        <TouchableOpacity 
                         onPress={() => this.onEdit(item.title)}
                         style={[styles.buttons, {backgroundColor: indigo}]}>
                            <FontAwesome name='edit' size={30} style={styles.icons}/>
                        </TouchableOpacity>
                        </View>
                    </View>
                )}
                leftOpenValue={150} 
                rightOpenValue={-150}
            />
        )
    }
}

const styles = StyleSheet.create( {
    container: {
        flexDirection: 'row',
        alignItems: Platform.OS === 'ios' ? 'flex-end' : 'flex-start',
        padding: 5,
    },
    backContainer: {
        flexDirection: 'row',
        justifyContent: Platform.OS === 'ios' ? 'flex-end' : 'flex-start',
        alignItems: Platform.OS === 'ios' ? 'flex-end' : 'flex-start',
        backgroundColor: lightGray,
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
    buttons: {
        alignSelf: "center",
        justifyContent: 'center',
        width: 70,
        height: 100,
    },
    icons: {
        alignSelf: 'center',
        color: white,
    }
} )

function mapStateToProps({decks, visible} ) {
    const data = Object.keys( decks ).map( deck => decks[ deck ] )

    return {
        data
    }
}

export default connect( mapStateToProps )( Decks )