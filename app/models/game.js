import Ember from 'ember';
import DS from 'ember-data';

const { attr, hasMany } = DS;
const { computed } = Ember;

export default DS.Model.extend({
  players: hasMany('player'),
  cards: hasMany('cards'),
  //turns: hasMany('turn'),
  name: attr(),
  code: attr(),
  status: attr(),
  initialCardCount: attr(),
  waitingToStart: computed.equal('status', 'waiting-to-start'),
  started: computed.not('waitingToStart'),
  gameEnded: false,
  winner: null,
  currentCard: null,
  currentPlayer: null,
});
