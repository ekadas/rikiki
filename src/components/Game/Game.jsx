import React from 'react'
import ImmutablePropTypes from 'react-immutable-proptypes'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Map, List } from 'immutable'

import {
  getLatestActiveRound,
  getCards,
  getTotalPoints
} from '../../state/selectors'
import { setHits, setUndertaken } from '../../state/actions'
import style from './Game.scss'

class Game extends React.Component {
  constructor (props) {
    super (props)

    this.onPlayerAction = this.onPlayerAction.bind(this)
    this.onSubmit = this.onSubmit.bind(this)

    this.state = {
      playerAction: Map(),
      error: null
    }
  }

  onPlayerAction (player, value) {
    const playerAction = value !== ''
      ? this.state.playerAction.set(player, Number(value))
      : this.state.playerAction.delete(player)
    this.setState({
      playerAction,
      error: null
    })
  }

  renderActionInput (player, placeholder, autoFocus) {
    return (
      <input
        autoFocus={autoFocus}
        name='player action'
        type='number'
        className={style.inputBox}
        placeholder={placeholder}
        value={this.state.playerAction.get(player, '')}
        required
        onChange={({ target }) => this.onPlayerAction(player, target.value)} />
    )
  }

  renderPlayers () {
    return this.props.players.map(player => {
      const autoFocus = player === this.props.players.first()
      const undertaken = this.props.latestActiveRound === null
        ? this.renderActionInput(player, 'To undertake', autoFocus)
        : this.props.latestActiveRound.get(player)

      const hits = this.props.latestActiveRound !== null
        ? this.renderActionInput(player, 'Hits', autoFocus)
        : null

      return (
        <div className={style.playerContainer} key={player}>
          <div className={style.playerTitle}>
            <div className={style.playerName}>
              {player}
            </div>
            <div className={style.playerPoints}>
              {this.props.totalPoints.get(player)}
            </div>
          </div>
          <div className={style.undertakenTitle}>
            Undertaken
          </div>
          <div className={style.hitsTitle}>
            Hits
          </div>
          <div className={style.undertaken}>
            {undertaken}
          </div>
          <div className={style.hits}>
            {hits}
          </div>
        </div>
      )
    })
  }

  allPlayersActed () {
    return (this.props.players.equals(List(this.state.playerAction.keys())) && 
      this.state.playerAction.every(action => !isNaN(action)))
  }

  onSubmit (e) {
    e.preventDefault()

    if (!this.allPlayersActed()) {
      this.setState(error: 'Not all players acted!')
      return
    }

    const totalCards = this.state.playerAction.reduce((acc, action) => {
      return acc + action
    }, 0)

    if (this.props.latestActiveRound === null) {
      if (totalCards === this.props.cards) {
        this.setState({
          error: ('Can\'t have the total cards undertaken the ' +
            'same as required in the round. The dealer needs to change it.')
        })
        return
      }
      this.props.submitUndertaken(this.state.playerAction)
    } else {
      if (totalCards !== this.props.cards) {
        this.setState({
          error: 'The cards hit does not match the total cards this round.'
        })
        return
      }
      this.props.submitHits(this.state.playerAction)
    }

    this.setState({ error: null, playerAction: Map()})
  }

  render () {
    return (
      <div>
        <h1 className={style.title}>{this.props.cards}</h1>
        <div className={style.error}>
          {this.state.error}
        </div>
        <form onSubmit={this.onSubmit}>
          {this.renderPlayers()}
          <button
            type='submit'
            onClick={this.onSubmit}
            disabled={!this.allPlayersActed()}>
            Submit {this.props.latestActiveRound === null ? 'Undertaken' : 'Hits'}
          </button>
        </form>
      </div>
    )
  }
}

Game.propTypes = {
  players: ImmutablePropTypes.list.isRequired
}

const mapStateToProps = state => {
  return {
    players: state.get('players'),
    latestActiveRound: getLatestActiveRound(state),
    cards: getCards(state),
    totalPoints: getTotalPoints(state)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    submitHits: hits => dispatch(setHits(hits)),
    submitUndertaken: undertaken => dispatch(setUndertaken(undertaken))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Game)
