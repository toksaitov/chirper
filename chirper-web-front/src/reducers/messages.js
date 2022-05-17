import * as actions from '../actions/types.js';

const messages = (state = [], action) => {
    switch (action.type) {
        case actions.LOAD_MESSAGES_SUCCESS:
            return action.messages;
        case actions.CREATE_MESSAGE_SUCCESS:
            return [
                ...state,
                action.message
            ];
        case actions.EDIT_MESSAGE_SUCCESS:
            return state.map(item => item.id !== action.message.id ? item : action.message);
        case actions.DELETE_MESSAGE_SUCCESS:
            return state.filter(message => message.id !== action.id);
        default:
            return state;
    }
}

export default messages;
