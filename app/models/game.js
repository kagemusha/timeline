import DS from 'ember-data';

const { attr, hasMany } = DS;

export default DS.Model.extend({
  players: hasMany('player'),
  cards: hasMany('cards'),
  //turns: hasMany('turn'),
  name: attr(),
  code: attr(),
  initialCardCount: attr(),
  isWaitingToStart: true,
  gameEnded: false,
  winner: null,
  currentCard: null,
  currentPlayer: null,
});
