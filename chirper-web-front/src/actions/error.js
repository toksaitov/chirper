import * as actions from './types.js';

export const setError = error => ({
    'type': actions.SET_ERROR,
    error 
});

export const clearError = () => ({
    'type': actions.SET_ERROR,
    'error': null
});
