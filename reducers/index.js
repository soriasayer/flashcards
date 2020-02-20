import { combineReducers } from 'redux'
import {decks, counter, result } from './deckReducer'

export default combineReducers({
    decks,
    counter,
    result,
})