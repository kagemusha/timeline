import DS from 'ember-data';

const { attr } = DS;

export default DS.Model.extend({
  //players: hasMany('player'),
  //cards: hasMany('cards'),
  //turns: hasMany('turn'),
  name: attr(),
  code: attr(),
});
