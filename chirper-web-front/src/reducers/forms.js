import * as actions from '../actions/types.js';

export const createMessageForm = (state = { 'content': '' }, action) => {
    switch (action.type) {
        case actions.UPDATE_CREATE_MESSAGE_FORM:
            return { ...state, [action.name]: action.value };
        case actions.CLEAR_CREATE_MESSAGE_FORM:
            return { ...state, 'content': '' };
        default:
            return state;
    }
}

// TODO: add reducers to other forms
