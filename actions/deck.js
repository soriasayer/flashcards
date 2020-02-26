import { generateQID } from '../utils/helpers'

export const ADD_DECK = 'ADD_DECK'
export const ADD_QUESTION = 'ADD_QUESTION'
export const CURRENT_CARD = 'CURRENT_CARD'
export const RESTART_QUIZ = 'RESTART_QUIZ'
export const QUESTION_RERSULT = 'QUESTION_RERSULT'
export const CLEAR_RERSULT = 'CLEAR_RERSULT'
export const DELETE_DECK = 'DELETE_DECK'
export const EDIT_DECK = 'EDIT_DECK'
export const INPUT_TITLE = 'INPUT_TITLE'
export const INPUT_ID = 'INPUT_ID'
export const VISIBLE_MODAL = 'VISIBLE_MODAL'

export const addDeckTitle = (did, title) => {
    return{
        type: ADD_DECK,
        did,
        title,
    }
}

export const removeDeck = (did) => {
    return {
        type: DELETE_DECK,
        did,
    }
}

export const addQuestion = ( did, question, answer ) => {
    alert(did)
    return{
        type: ADD_QUESTION,
        did,
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

export const visibleModal = (isVisible) => {
    return {
        type: VISIBLE_MODAL,
        isVisible
    }
}

export const editDeck = (did, title) => {
    return {
        type: EDIT_DECK,
        did,
        title,
    }
}

