import {
    CREATE_POST_SUCCESS,
    CREATE_POST_FAILURE
} from 'redux/post/types'


export const createPostSuccess = (user, text) => {
    return {
        type: CREATE_POST_SUCCESS,
        user,
        text,

    };
};

export const createPostFailure = (error) => {
    return {
        type: CREATE_POST_FAILURE,
        error

    };
};
