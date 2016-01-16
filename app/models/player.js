import DS from 'ember-data';

export default DS.Model.extend({
  name: null,
  cardsRemaining: 0  // meant to be transient for now, eventually belongs to a player-game relat
});
