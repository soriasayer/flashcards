import React, { Component } from 'react'
import { FlatList, ScrollView, SafeAreaView, View } from 'react-native'
import FlashCards from './FlashCards'
import { getData } from './FlashCards'
import { connect } from 'react-redux'

class Decks extends Component {
   
    render () {
        
       const {data} = this.props
        
        return(
            <SafeAreaView >
                <FlatList
                data={data}
                renderItem={({ item }) => <FlashCards title={item.title} questions={item.questions} navigation={this.props.navigation} />}
                keyExtractor={item => item.title}
                />
            </SafeAreaView>
        )
    }
}

function mapStateToProps({decks}) {
    const data = Object.keys(decks).map(deck => decks[deck])
    
    return {
        data
    }
}

export default connect(mapStateToProps)(Decks)

