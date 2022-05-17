import { combineReducers } from 'redux';

import messages from './messages.js';
import user from './user.js';
import error from './error.js';
import { createMessageForm } from './forms.js';

export default combineReducers({
    messages, user, error, createMessageForm
});
