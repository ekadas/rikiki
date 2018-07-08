import { createSelector } from 'reselect'
import { Map } from 'immutable'

const BASE_POINTS = 10
const HIT_POINTS = 2

export const getGameActive = createSelector(
  state => state.get('players'),
  players => {
    return players.size > 0
  }
)

export const getLatestActiveRound = createSelector(
  state => state.get('rounds'),
  rounds => {
    const lastRound = rounds.last()
    return lastRound
      ? lastRound.get('hits')
        ? null
        : lastRound.get('undertaken')
      : null
  }
)

export const getCards = createSelector(
  state => state.get('rounds'),
  state => state.get('maxCards'),
  getLatestActiveRound,
  (rounds, maxCards, lastRound) => {
    return rounds.size < maxCards
      ? lastRound === null
        ? rounds.size + 1
        : rounds.size
      : lastRound === null
        ? 2 * maxCards - (rounds.size + 1)
        : 2 * maxCards - rounds.size
  }
)

export const getCompleteRounds = createSelector(
  state => state.get('rounds'),
  rounds => {
    return rounds.filter(round => round.get('hits') && round.get('undertaken'))
  }
)

function calculatePointsForRound (undertaken, hits) {
  if (undertaken === hits) {
    return BASE_POINTS + (hits * HIT_POINTS)
  }
  return (undertaken > hits ? hits - undertaken : undertaken - hits) * HIT_POINTS
}

export const getTotalPoints = createSelector(
  getCompleteRounds,
  state => state.get('players'),
  (rounds, players) => {
    const initialPoints = players.reduce((acc, player) => {
      return acc.set(player, 0)
    }, Map())

    return rounds.reduce((acc, round) => {
      return acc.map((points, player) => {
        return calculatePointsForRound(
          round.get('undertaken').get(player),
          round.get('hits').get(player)
        ) + points
      })
    }, initialPoints)
  }
)
