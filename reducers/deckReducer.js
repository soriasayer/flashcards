import { ADD_DECK } from '../actions/deck'
import { ADD_QUESTION } from '../actions/deck'

export default function decks(state = {}, action){
    switch(action.type) {
        case ADD_DECK :
            return {
                ...state,
                [action.title]: {
                    title: action.title,
                    questions: []
                }
            }
        case ADD_QUESTION : 
            return {
                ...state,
                [action.deckTitle]: {
                    title: action.deckTitle,
                    questions: [
                        ...state[action.deckTitle].questions,
                        {
                            question: action.question,
                            answer: action.answer
                        }
                    ]
                }
                
            }
       
         default: 
        return state
    }
}