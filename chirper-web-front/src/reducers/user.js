import * as actions from '../actions/types.js';

const user = (state = null, action) => {
    switch (action.type) {
        case actions.LOGIN_USER_SUCCESS:
        case actions.REGISTER_USER_SUCCESS:
        case actions.LOAD_USER_SUCCESS:
            return action.user;
        case actions.LOGOUT_USER_SUCCESS:
            return null;
        default:
            return state;
    }
}

export default user;
