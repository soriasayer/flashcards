import { generateQID } from '../utils/helpers'

export const ADD_DECK = 'ADD_DECK'
export const ADD_QUESTION = 'ADD_QUESTION'
export const CURRENT_CARD = 'CURRENT_CARD'

export const addDeckTitle = (title) => {
    return{
        type: ADD_DECK,
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