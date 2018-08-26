import { combineReducers } from 'redux-immutable'
import { List, Map, fromJS } from 'immutable'

export const SET_MAX_CARDS = 'SET_MAX_CARDS'
export const SET_PLAYERS = 'SET_PLAYERS'
export const SET_HITS = 'SET_HITS'
export const SET_UNDERTAKEN = 'SET_UNDERTAKEN'
export const RESET_ROUND = 'RESET_ROUND'
export const RESET_ROUNDS = 'RESET_ROUNDS'

const initialRounds = fromJS(JSON.parse(window.localStorage.getItem('rounds')) || [])
const rounds = (state = initialRounds, action) => {
  switch (action.type) {
    case SET_HITS:
      return state.set(-1, state.last().set('hits', action.hits))
    case SET_UNDERTAKEN:
      return state.push(Map({undertaken: action.undertaken}))
    case RESET_ROUND:
      return state.delete(-1)
    case RESET_ROUNDS:
      return List()
    default:
      return state
  }
}

const initialMaxCards = window.localStorage.getItem('maxCards') || 10
const maxCards = (state = initialMaxCards, action) => {
  switch (action.type) {
    case SET_MAX_CARDS:
      return action.maxCards
    default:
      return state
  }
}

const initialPlayers = List(JSON.parse(window.localStorage.getItem('players')) || [])
const players = (state = initialPlayers, action) => {
  switch (action.type) {
    case SET_PLAYERS:
      return List(action.players)
    default:
      return state
  }
}

const rootReducer = combineReducers({
  rounds,
  maxCards,
  players
})

export default rootReducer
