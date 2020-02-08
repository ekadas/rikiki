import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { ConnectedRouter as Router } from 'connected-react-router/immutable'
import * as OfflinePluginRuntime from 'offline-plugin/runtime'

import { store, history } from './state/store'

import App from './components/App'
import './index.scss'

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
)

OfflinePluginRuntime.install()
