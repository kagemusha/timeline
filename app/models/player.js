import DS from 'ember-data';

const { attr } = DS;

export default DS.Model.extend({
  //a slight denormalization to help with adding players to games
  gameCode: attr(),

  name: attr(),
  cardsRemaining: attr(),
  totalCards: attr(),
  game: DS.belongsTo('game')
});
