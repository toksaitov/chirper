import parameters from '../parameters.js';
import * as actions from './types.js';

import { setError } from './error.js';

export const loadMessages = () => {
    return dispatch => {
        fetch(`${parameters.apiURL}/messages`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
            },
        })
        .then(response => response)
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                dispatch(setError(data.error));
            } else {
                dispatch({
                    'type': actions.LOAD_MESSAGES_SUCCESS,
                    'messages': data
                });
            }
        })
        .catch(error => {
            dispatch(setError(`${error}`));
        });
    };
};

export const createMessage = (content, onSuccess) => {
    return dispatch => {
        fetch(`${parameters.apiURL}/message/create`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ content })
        })
        .then(response => response)
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                dispatch(setError(data.error));
            } else {
                dispatch({
                    'type': actions.CREATE_MESSAGE_SUCCESS,
                    'message': data
                });
                onSuccess();
            }
        })
        .catch(error => {
            dispatch(setError(`${error}`));
        });
    };
};

export const editMessage = (id, content, onSuccess) => {
    return dispatch => {
        fetch(`${parameters.apiURL}/message/${id}/edit`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ content })
        })
        .then(response => response)
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                dispatch(setError(data.error));
            } else {
                dispatch({
                    'type': actions.EDIT_MESSAGE_SUCCESS,
                    'message': data
                });
                onSuccess();
            }
        })
        .catch(error => {
            dispatch(setError(`${error}`));
        });
    };
};

export const deleteMessage = id => {
    return dispatch => {
        fetch(`${parameters.apiURL}/message/${id}/delete`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => response)
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                dispatch(setError(data.error));
            } else {
                dispatch({
                    'type': actions.DELETE_MESSAGE_SUCCESS,
                    id
                });
            }
        })
        .catch(error => {
            dispatch(setError(`${error}`));
        });
    };
};
