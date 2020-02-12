import { combineReducers } from 'redux'
import {decks, counter} from './deckReducer'

export default combineReducers({
    decks,
    counter,
})