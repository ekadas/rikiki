import {
  SET_MAX_CARDS,
  SET_PLAYERS,
  SET_HITS,
  SET_UNDERTAKEN,
  RESET_ROUNDS
} from './reducers'

export function setMaxCards (maxCards) {
  return {
    type: SET_MAX_CARDS,
    maxCards
  }
}

export function setPlayers (players) {
  return {
    type: SET_PLAYERS,
    players
  }
}

export function setHits (hits) {
  return {
    type: SET_HITS,
    hits
  }
}

export function setUndertaken (undertaken) {
  return {
    type: SET_UNDERTAKEN,
    undertaken
  }
}

export function resetRounds () {
  return {
    type: RESET_ROUNDS
  }
}

export function setupGame (players, maxCards) {
  return (dispatch, getState) => {
    window.localStorage.setItem('players', JSON.stringify(players))
    dispatch(setPlayers(players))

    window.localStorage.setItem('maxCards', maxCards)
    dispatch(setMaxCards(maxCards))

    dispatch(resetRounds())
  }
}
