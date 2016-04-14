import DS from 'ember-data';

const { attr } = DS;

export default DS.Model.extend({
  players: DS.hasMany('player'),
  //cards: hasMany('cards'),
  //turns: hasMany('turn'),
  name: attr(),
  code: attr(),
  isWaitingToStart: true
});
