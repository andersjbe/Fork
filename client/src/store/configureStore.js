import {
    createStore, applyMiddleware, combineReducers, compose
} from 'redux'
import thunk from 'redux-thunk'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

import auth from './users'
import currentRecipe from './currentRecipe'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const persistConfig = {
    key: 'root',
    storage
}

const reducer = persistReducer(
    persistConfig,
    combineReducers({
        auth,
        currentRecipe,
    }))

export default () => {
    const store = createStore(
        reducer,
        composeEnhancers(applyMiddleware(thunk))
    )

    const persistor = persistStore(store)
    return { store, persistor }
}