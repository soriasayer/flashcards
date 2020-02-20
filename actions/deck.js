import { generateQID } from '../utils/helpers'

export const ADD_DECK = 'ADD_DECK'
export const ADD_QUESTION = 'ADD_QUESTION'
export const CURRENT_CARD = 'CURRENT_CARD'
export const RESTART_QUIZ = 'RESTART_QUIZ'
export const QUESTION_RERSULT = 'QUESTION_RERSULT'
export const CLEAR_RERSULT = 'CLEAR_RERSULT'
export const DELETE_DECK = 'DELETE_DECK'

export const addDeckTitle = (title) => {
    return{
        type: ADD_DECK,
        title,
    }
}

export const removeDeck = (title) => {
    return {
        type: DELETE_DECK,
        title,
    }
}

export const addQuestion = ( deckTitle, question, answer ) => {
    return{
        type: ADD_QUESTION,
        deckTitle,
        question, 
        answer,
    }
}

export const currentCard = () => {
    return{
        type: CURRENT_CARD,
    }
}

export const restartQuestion = () => {
    return {
        type: RESTART_QUIZ
    }
}

export const showResult = (question, isTtrue, answer) => {
    return {
        type: QUESTION_RERSULT,
        question,
        isTtrue,
        answer,
    }
}

export const cleanResult = () => {
    return {
        type: CLEAR_RERSULT
    }
}