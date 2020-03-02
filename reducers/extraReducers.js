import {
    CURRENT_CARD,
    RESTART_QUIZ,
    QUESTION_RERSULT,
    CLEAR_RERSULT,
    VISIBLE_MODAL,
    SCREEN_TITLE,
    EDIT_MODE,
    ON_EDIT,
    ON_ADD,
} from '../actions/action'

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

export function visibleModal(state = false, action) {
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

export function openEdit(state= '', action) {
    switch(action.type) {
        case ON_EDIT :
            return action.edit
        case ON_ADD :
            return action.add
        default: 
        return state
    }
}