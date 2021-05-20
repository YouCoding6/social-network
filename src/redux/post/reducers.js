
import {
    CREATE_POST_SUCCESS,
    CREATE_POST_FAILURE
} from 'redux/post/types'

const initialStatePost = {
    user: null,
    text: null
}

const postReducer = (state = initialStatePost, action) => {

    const { type, user, error, text } = action

    switch (type) {

        case CREATE_POST_SUCCESS:
            return {
                ...state,
                user,
                text
            }
        case CREATE_POST_FAILURE:
            return {
                ...state,
                error
            }

        default:
            return state
    }
}


export default postReducer

