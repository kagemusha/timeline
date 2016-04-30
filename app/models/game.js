import DS from 'ember-data';

const { attr, hasMany } = DS;

export default DS.Model.extend({
  players: hasMany('player'),
  cards: hasMany('cards'),
  //turns: hasMany('turn'),
  name: attr(),
  code: attr(),
  isWaitingToStart: true,
  currentCard: null,
  currentPlayer: null,
});
