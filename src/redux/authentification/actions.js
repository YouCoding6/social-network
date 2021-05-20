import {
    REGISTER_SUCCESS,
    REGISTER_FAILURE,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    LOGOUT_SUCCESS,
    EDIT_USER
} from 'redux/authentification/types'


export const registerSuccess = (user, token) => {
    return {
        type: REGISTER_SUCCESS,
        user,
        token

    };
};

export const registerFailure = (error) => {
    return {
        type: REGISTER_FAILURE,
        error
    };
};

export const loginSuccess = (user, token) => {
    return {
        type: LOGIN_SUCCESS,
        user,
        token

    };
};

export const loginFailure = (error) => {
    return {
        type: LOGIN_FAILURE,
        error
    };
};

export const logoutSuccess = () => {
    return {
        type: LOGOUT_SUCCESS
    };
};

export const editUser = () => {
    return {
        type: EDIT_USER
    }
} 