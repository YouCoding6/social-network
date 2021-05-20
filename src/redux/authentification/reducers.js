import Cookies from 'js-cookie'
import {
    REGISTER_SUCCESS,
    REGISTER_FAILURE,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    LOGOUT_SUCCESS,
    EDIT_USER
} from 'redux/authentification/types'

const initialStateAuthentication = {
    isAuthenticated: Cookies.get('token') ? true : false,
    user: null,
    token: null,
    description: null
}

const authenticationReducer = (state = initialStateAuthentication, action) => {

    const { type, user, token, error, description, username } = action
    switch (type) {

        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            return {
                ...state,
                user,
                token,
                isAuthenticated: true,
            }
        case REGISTER_FAILURE:
        case LOGIN_FAILURE:
            return {
                ...state,
                isAuthenticated: false,
                error
            }
        case LOGOUT_SUCCESS:
            return {
                ...state,
                isAuthenticated: false
            }
        case EDIT_USER:
            return {
                ...state,
                user,
                username,
                description
            }

        default:
            return state
    }
}


export default authenticationReducer