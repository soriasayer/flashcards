import React, { Component } from 'react'
import { FlatList, ScrollView, SafeAreaView } from 'react-native'
import {FlashCards} from './FlashCards'
import { getData } from './FlashCards'

class Decks extends Component {
   
    render () {
        
        const data = getData()
        return(
            <SafeAreaView>
                <FlatList 
                    data={data}
                    renderItem={({item}) => <FlashCards {...item} navigation={this.props.navigation} />}
                />
            </SafeAreaView>
        )
    }
}

export default Decks