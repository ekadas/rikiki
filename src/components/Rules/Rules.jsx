import React from 'react'

import style from './Rules.scss'

class Rules extends React.Component {
  render () {
    return (
      <div>
        <h1 className={style.title}>Rikiki</h1>
        <h3>Introduction</h3>
        <p>Use this app to help you keep score for Rikiki.</p>
        <p>Rikiki is popular card game in Hungary. It is best played
          with 3-7 players with a single deck of cards.</p>

        <h3>The Objective</h3>
        <p>The objective of the game is to accumulate the most points.
          Points are gained by hitting exactly as many cards as
          undertaken per round.</p>

        <h3>Card Ranking</h3>
        <p>A standard 52 card pack is used. The cards in each suit rank
          from highest to lowest: A K Q J 10 9 8 7 6 5 4 3 2.</p>

        <h3>The Game</h3>
        <p>The number of cards dealt changes each round. In the first
          round there is 1 card per player, 2 in the second, 3 in the
          third and so forth, until it reaches the maximum number of
          cards players wished to play with, at which point the number of
          cards will decrease until 1 card per player. After this round,
          the player with the most points is declared the winner and the
          game is over.</p>
        <p>The dealer rotates in an anticlockwise order. In each round the
          dealer must deal the appropriate number of cards, face down, to
          each player and place an extra card on the table. The suit of
          this card is the trump suit.</p>
        <p>Other than when there is only 1 card per player, the players
          should look at their cards and decide the number of cards they
          think they will win with this round. Once everyone decided, the
          players should reveal the number undertaken at the same time
          (for example with the show of fingers). If the number undertaken
          equals to the number of cards that turn, the dealer must change
          their undertaken, to ensure there is no round when everyone wins.
          The undertaken is recorded for each player and the round commences
          by the player right of the dealer placing a card.</p>
        <p>Following this, all players must also place a card down, in an
          anticlockwise order. Each player that can, must place a card of
          the same suit that the first player placed. However, there is no
          obligation to place a larger card. If a player cannot place a
          card of the same suit, they can place a card of any suit, including
          the trump.</p>
        <p>The player who placed the highest card wins a hit in that round.
          If there is a card of the trump suit, the highest of the trump cards
          wins. Otherwise it is the highest of the first card's suit. Note:
          even the lowest 2 card of a non trump suit can win a round if no
          other player placed a card of the same suit or a trump.</p>
        <p>The player that got the last hit will then be responsible for
          placing the first card and the above is repeated until the players
          no longer have cards. At this point the number of hits is noted
          down.</p>

        <h3>Points</h3>
        <p>A player that has undertaken the number of cards they hit will get
          10 points plus twice the number of cards hit. So for example if they
          predicted they would hit 2 they would get 14 points. However if the
          undertaken does not match the number of hits, the player would get
          negative points equal to twice the difference between the undertaken
          and hit cards. So for example, if they undertook 3, however only
          managed to hit 1, they would get -4 points.</p>

        <h3>Rounds with 1 Card</h3>
        <p>The rounds where players are dealt 1 card are special in that
          the players must not look at their own cards and instead place it
          on their foreheads, so they can see other player's cards, but not
          their own. Every other rule is the same however.</p>
      </div>

    )
  }
}

export default Rules
