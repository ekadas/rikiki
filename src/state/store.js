import { applyMiddleware, compose, createStore } from 'redux'
import { createBrowserHistory } from 'history'
import { connectRouter, routerMiddleware } from 'connected-react-router/immutable'
import Thunk from 'redux-thunk'

import rootReducer from './reducers'

const history = createBrowserHistory()
const middleware = routerMiddleware(history)

const store = createStore(
  connectRouter(history)(rootReducer),
  compose(
    applyMiddleware(Thunk),
    applyMiddleware(middleware)
  )
)

export { store, history }
