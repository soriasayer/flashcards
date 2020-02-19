import { combineReducers } from 'redux'
import {decks, counter, resualt } from './deckReducer'

export default combineReducers({
    decks,
    counter,
    resualt,
})