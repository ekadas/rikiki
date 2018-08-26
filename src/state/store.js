import { applyMiddleware, compose, createStore } from 'redux'
import { createHashHistory as createHistory } from 'history'
import { connectRouter, routerMiddleware } from 'connected-react-router/immutable'
import Thunk from 'redux-thunk'

import rootReducer from './reducers'

const history = createHistory()
const middleware = routerMiddleware(history)

const store = createStore(
  connectRouter(history)(rootReducer),
  compose(
    applyMiddleware(Thunk),
    applyMiddleware(middleware)
  )
)

store.subscribe(() => {
  window.localStorage.setItem('rounds', JSON.stringify(store.getState().get('rounds')))
})

export { store, history }
