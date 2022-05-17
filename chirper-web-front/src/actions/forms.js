import * as actions from './types.js';

export const updateCreateMessageForm = (name, value) => ({
    'type': actions.UPDATE_CREATE_MESSAGE_FORM,
    name, value
});

export const clearCreateMessageForm = () => ({
    'type': actions.CLEAR_CREATE_MESSAGE_FORM
});
