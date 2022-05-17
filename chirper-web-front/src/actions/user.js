import parameters from '../parameters.js';
import * as actions from './types.js';

import { setError } from './error.js';

export const loginUser = (login, password) => {
    return dispatch => {
        fetch(`${parameters.apiURL}/login`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                login,
                password
            })
        })
        .then(response => response)
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                dispatch(setError(data.error));
            } else {
                dispatch({
                    'type': actions.LOGIN_USER_SUCCESS,
                    'user': data
                });
            }
        })
        .catch(error => {
            dispatch(setError(`${error}`));
        });
    };
};

export const registerUser = (login, password, passwordRepeat) => {
    return dispatch => {
        fetch(`${parameters.apiURL}/register`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                login, password,
                'password-repeat': passwordRepeat
            })
        })
        .then(response => response)
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                dispatch(setError(data.error));
            } else {
                dispatch({
                    'type': actions.REGISTER_USER_SUCCESS,
                    'user': data
                });
            }
        })
        .catch(error => {
            dispatch(setError(`${error}`));
        });
    };
};


export const loadUser = () => {
    return dispatch => {
        fetch(`${parameters.apiURL}/user`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => response)
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                dispatch({
                    'type': actions.LOAD_USER_SUCCESS,
                    'user': data
                });
            }
        })
        .catch(error => {
            console.log(`${error}`);
        });
    };
};

export const logoutUser = () => {
    return dispatch => {
        fetch(`${parameters.apiURL}/logout`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => response)
        .then(response => response.json())
        .then(data => {
            if (!data) {
                dispatch({
                    'type': actions.LOGOUT_USER_SUCCESS
                });
            } else {
                dispatch(setError(data.error));
            }
        })
        .catch(error => {
            dispatch(setError(`${error}`));
        });
    };
};
