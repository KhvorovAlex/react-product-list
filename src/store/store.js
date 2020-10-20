import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'

//reducers
import authReducer from './auth'
import cartReducer from './cart'
import productsReducer from './products'

const rootReducer = combineReducers({
    auth: authReducer,
    product: productsReducer,
    cart: cartReducer,
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunkMiddleware)))

window.store = store

export default store
