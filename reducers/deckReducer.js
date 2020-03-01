import { 
    ADD_DECK,
    ADD_QUESTION,
    CURRENT_CARD,
    RESTART_QUIZ,
    QUESTION_RERSULT,
    CLEAR_RERSULT,
    DELETE_DECK,
    EDIT_DECK,
    VISIBLE_MODAL,
    SCREEN_TITLE,
    REMOVE_QUESTION,
    EDIT_QUESTION,
    EDIT_MODE,
 } from '../actions/deck'

export  function decks(state = {}, action){
    switch(action.type) {
        case ADD_DECK :
            return {
                ...state,
                [action.did]: {
                    id: action.did,
                    title: action.title,
                    questions: []
                }
            }
        case ADD_QUESTION : 
            return {
                ...state,
                [action.did]: {
                    id: action.did,
                    title: state[action.did].title,
                    questions: [
                        ...state[action.did].questions,
                       {
                            question: action.question,
                            answer: action.answer,
                        }
                    ]
                }
            }
        case DELETE_DECK :
            const deckList = Object.keys(state).map(deck => state[deck]).filter(currentDeck => currentDeck.id !== action.did)
            const newDeck = deckList.map(deck => ({[deck.id] : deck}))
            const filteredDeck = Object.assign({}, ...newDeck)
            return {
                ...filteredDeck
            }
        case EDIT_DECK :
            if(action.title !== '') {
                return {
                    ...state,
                    [action.did]: {
                        id: action.did,
                        title: action.title,
                        questions: state[action.did].questions
                    }
                } 
            } else {
                return state
            }
        case REMOVE_QUESTION :
            return {
                ...state,
                [action.did]: {
                    id: action.did,
                    title: state[action.did].title,
                    questions: state[action.did].questions.filter((question, id) => id !== action.qid)
                }
            } 
        case EDIT_QUESTION : 
        if(action.question && action.answer !== '') {
            return {
                ...state,
                [action.did]: {
                    id: action.did,
                    title: state[action.did].title,
                    questions: [
                        {
                            question: state[action.did].questions.map((question, id) => {
                                    if(id === action.qid) {
                                        return state[action.did].questions.question = action.question
                                    }
                                }),

                            answer: state[action.did].questions.map((question, id) => {
                                    if(id === action.qid) {
                                        return state[action.did].questions.answer = action.answer
                                    }
                                }),
                        }
                    ]
                }
            }
        } else {
            return state
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

export function visible(state = false, action) {
    switch(action.type) {
        case VISIBLE_MODAL : 
            return action.isVisible
        default: 
            return state
    }
}

export function edit(state = false, action) {
    switch(action.type) {
        case EDIT_MODE : 
            return action.editable
        default: 
            return state
    }
}

export function screenName(state = '', action) {
    switch(action.type) {
        case SCREEN_TITLE : 
            return action.title
        default: 
        return state
    }
}
     