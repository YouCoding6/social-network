import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import authenticationReducer from 'redux/authentification/reducers'
import postReducer from 'redux/post/reducers'
import thunkMiddleware from 'redux-thunk'

const rootReducer = combineReducers({
    authenticationReducer,
    postReducer
})


let store = createStore(
    rootReducer,
    compose(applyMiddleware(thunkMiddleware), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
)



export default store