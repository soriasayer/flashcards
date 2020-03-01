import { combineReducers } from 'redux'
import { decks } from './deckReducer'
import { counter, result, visible, screenName, visibleModal, openEdit } from './extraReducers'

export default rootReducer = combineReducers({
    decks,
    counter,
    result,
    visible,
    screenName,
    visibleModal,
    openEdit,
})