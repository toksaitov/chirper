import * as actions from '../actions/types.js';

const error = (state = null, action) =>
    action.type === actions.SET_ERROR ? action.error : state;

export default error;
