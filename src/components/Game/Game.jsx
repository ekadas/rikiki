import React from 'react'
import ImmutablePropTypes from 'react-immutable-proptypes'
import { connect } from 'react-redux'
import { Map, Set } from 'immutable'
import classNames from 'classnames'

import {
  getLatestActiveRound,
  getCards,
  getTotalPoints
} from '../../state/selectors'
import {
  setHits,
  setUndertaken,
  resetRound
} from '../../state/actions'
import style from './Game.scss'

class Game extends React.Component {
  constructor (props) {
    super(props)

    this.onPlayerAction = this.onPlayerAction.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.resetRound = this.resetRound.bind(this)

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

  renderActionInput (player, autoFocus, undertake) {
    const placeholder = undertake ? 'To undertake' : 'Hits'
    return (
      <input
        autoFocus={autoFocus}
        name='player action'
        type='number'
        className={classNames(style.inputBox, undertake ? style.left : style.right)}
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
        ? this.renderActionInput(player, autoFocus, true)
        : this.props.latestActiveRound.get(player)

      const hits = this.props.latestActiveRound !== null
        ? this.renderActionInput(player, autoFocus, false)
        : null

      return (
        <div className={style.playerContainer} key={player}>
          <div className={classNames(style.playerTitle, style.left)}>
            <div className={style.playerName}>
              {player}
            </div>
            <div className={classNames(style.playerPoints, style.right)}>
              {this.props.totalPoints.get(player)}
            </div>
          </div>
          <div className={classNames(style.undertaken, style.left)}>
            {undertaken}
          </div>
          <div className={classNames(style.hits, style.right)}>
            {hits}
          </div>
        </div>
      )
    })
  }

  allPlayersActed () {
    return (this.props.players.equals(Set(this.state.playerAction.keys())) &&
      this.state.playerAction.every(action => !isNaN(action)))
  }

  resetRound () {
    this.setState({ error: null, playerAction: Map() })

    if (this.props.latestActiveRound !== null) {
      this.props.resetRound()
    }
  }

  onSubmit (e) {
    e.preventDefault()

    if (!this.allPlayersActed()) {
      this.setState({ error: 'Not all players acted!' })
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

    this.setState({ error: null, playerAction: Map() })
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
          <div className={style.actions}>
            <button
              type='button'
              onClick={this.resetRound}
              className={classNames(style.resetRound, style.left)}
              disabled={this.state.playerAction === Map() && this.props.latestActiveRound === null}>
              Reset
            </button>
            <button
              type='submit'
              onClick={this.onSubmit}
              className={classNames(style.submitButton, style.right)}
              disabled={!this.allPlayersActed() || this.state.error}>
              Submit
            </button>
          </div>
        </form>
      </div>
    )
  }
}

Game.propTypes = {
  players: ImmutablePropTypes.set.isRequired
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
    submitUndertaken: undertaken => dispatch(setUndertaken(undertaken)),
    resetRound: () => dispatch(resetRound())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Game)
