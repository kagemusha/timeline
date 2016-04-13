import Ember from 'ember';
import DS from 'ember-data';

const { attr } = DS;
const { computed } = Ember;

export default DS.Model.extend({
  game: DS.belongsTo('game'),

  //a slight denormalization to help with adding players to games
  gameCode: attr(),

  name: attr(),
  cardsRemaining: attr(),
  totalCards: attr(),
  isCreator: attr(),
  isWinner: attr()
});
