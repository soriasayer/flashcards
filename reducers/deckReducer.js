import { ADD_DECK, ADD_QUESTION, CURRENT_CARD, RESTART_QUIZ, QUESTION_RERSULT, CLEAR_RERSULT } from '../actions/deck'

export  function decks(state = {}, action){
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

export function counter(state = 0, action){
    switch(action.type) {
        case CURRENT_CARD : 
            return state + 1
        case RESTART_QUIZ : 
            return 0
        default: 
        return state
    }

}

export function result(state = [], action) {
    switch(action.type) {
        case QUESTION_RERSULT:
            return [
                ...state,
                {
                    question: action.question,
                    isTtrue: action.isTtrue,
                    answer: action.answer,
                }
            ]
        case CLEAR_RERSULT : 
            return []
        default:
            return state
    }
}
     