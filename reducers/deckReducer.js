import { ADD_DECK } from '../actions/deck'

export default function decks(state = {}, action){
    switch(action.type) {
        case ADD_DECK :
            return {
                ...state,
                [action.title]: {
                    title: action.title
                }
            }
         default: 
        return state
    }
}