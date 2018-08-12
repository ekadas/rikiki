import React from 'react'
import PropTypes from 'prop-types'
import ImmutablePropTypes from 'react-immutable-proptypes'
import { connect } from 'react-redux'
import { fromJS } from 'immutable'

import { setupGame } from '../../state/actions'
import style from './NewGame.scss'

class NewGame extends React.Component {
  constructor (props) {
    super (props)

    this.onMaxCardsChange = this.onMaxCardsChange.bind(this)
    this.onPlayerChange = this.onPlayerChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)

    this.state = {
      maxCards: 10,
      players: props.players.size ? props.players.toJS().concat(['']) : [''],
      error: null
    }
  }

  onMaxCardsChange ({ target }) {
    this.setState({ maxCards: target.value })
  }

  onPlayerChange (index, { target }) {
    let players = this.state.players

    players[index] = target.value.toLowerCase()

    if (this.state.players.length - 1 === index) {
      players.push('')
    }

    this.setState({ players, error: null })
  }

  duplicatePlayerNames (names) {
    return names.length !== new Set(names).size
  }

  onSubmit (e) {
    e.preventDefault()

    const players = this.state.players.filter((player => player !== ''))
    if (this.duplicatePlayerNames(players)) {
      this.setState({error: 'Not allowed duplicate names'})
      return
    }

    this.props.onCreateGame(
      players,
      this.state.maxCards
    )
    this.props.history.push('/')
  }

  renderPlayers () {
    return this.state.players.map((player, index) => {
        return (
          <div key={index}>
            <input
              name='player'
              type='text'
              value={player}
              placeholder='player name'
              className={style.playerInput}
              onChange={this.onPlayerChange.bind(null, index)} />
          </div>
        )
      })
  }

  render () {
    return (
      <form onSubmit={this.onSubmit} className={style.NewGame}>
        <h1 className={style.title}>New Game</h1>
        <h3>Max Cards</h3>
        <input
          name='maxCards'
          type='number'
          value={this.state.maxCards}
          className={style.roundsInput}
          onChange={this.onMaxCardsChange} />
        <h3>Players</h3>
        <div className={style.error}>
          {this.state.error}
        </div>
        {this.renderPlayers()}
        <div className={style.actions}>
          <button
            type='button'
            className={style.cancelButton}
            onClick={() => this.props.history.push('/')}>
            Cancel
          </button>
          <button
            type='submit'
            onClick={this.onSubmit}
            className={style.submitButton}
            disabled={this.state.error !== null}>
            Create Game
          </button>
        </div>
      </form>
    )
  }
}

NewGame.propTypes = {
  onCreateGame: PropTypes.func.isRequired,
  players: ImmutablePropTypes.list.isRequired
}

const mapStateToProps = state => {
  return {
    players: state.get('players')
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onCreateGame: (players, maxCards) => dispatch(setupGame(players, maxCards))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewGame)
