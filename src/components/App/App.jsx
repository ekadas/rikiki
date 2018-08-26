import React from 'react'
import PropTypes from 'prop-types'
import { Route, Link, Switch, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import { getGameActive } from '../../state/selectors'
import NewGame from '../NewGame'
import Game from '../Game'
import style from './App.scss'

class App extends React.Component {
  componentDidCatch (error, info) {
    console.log(error, info)
  }

  render () {
    return (
      <div className={style.App}>
        <Switch>
          <Route exact path='/' component={(props) => (
            <div>
              <Link
                className={style.newGame}
                to='/new-game'>
                New Game
              </Link>
              {this.props.gameActive
                ? (<Game />)
                : <h1 className={style.title}>Rikiki</h1>}
            </div>
          )} />
          <Route exact path='/new-game' component={NewGame} />
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
