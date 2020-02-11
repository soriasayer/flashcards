export const ADD_DECK = 'ADD_DECK'

export const addDeckTitle = (title) => {
    return{
        type: ADD_DECK,
        title
    }
}