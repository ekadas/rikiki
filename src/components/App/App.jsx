import React from 'react'
import PropTypes from 'prop-types'
import {
  Route,
  Link,
  Switch,
  withRouter,
  Redirect
} from 'react-router-dom'
import { connect } from 'react-redux'

import { getGameActive } from '../../state/selectors'
import NewGame from '../NewGame'
import Game from '../Game'
import Rules from '../Rules'
import style from './App.scss'

class App extends React.Component {
  componentDidCatch (error, info) {
    console.log(error, info)
  }

  renderNavItem (to, text, disabled = false) {
    const pathname = this.props.location.pathname
    if (disabled || to === pathname) {
      return <span className={style.disabledNavItem}>{text}</span>
    }
    return <Link to={to} className={style.navItem}>{text}</Link>
  }

  render () {
    return (
      <div className={style.App}>
        <nav className={style.navigation}>
          {this.renderNavItem('/rules', 'Rules')}
          {this.renderNavItem('/new-game', 'New Game')}
          {this.renderNavItem('/', 'Scores', !this.props.gameActive)}
        </nav>
        <Switch>
          <Route exact path='/new-game' component={NewGame} />
          <Route exact path='/rules' component={Rules} />
          <Route exct path='/'
            render={props =>
              this.props.gameActive
                ? <Game />
                : <Redirect to={{ pathname: '/rules' }} />
            } />
        </Switch>
      </div>
    )
  }
}

App.propTypes = {
  gameActive: PropTypes.bool.isRequired
}

const mapStateToProps = state => {
  return {
    gameActive: getGameActive(state)
  }
}

export default withRouter(connect(mapStateToProps, null)(App))
