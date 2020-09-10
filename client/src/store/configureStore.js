import {
    createStore, applyMiddleware, combineReducers, compose
} from 'redux'
import thunk from 'redux-thunk'

import auth from './users'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const reducer = combineReducers({
    auth
})

export default (initialState) => {
    return createStore(
        reducer, 
        initialState, 
        composeEnhancers(applyMiddleware(thunk))
    )
}