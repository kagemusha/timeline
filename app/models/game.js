import DS from 'ember-data';

const { attr } = DS;

export default DS.Model.extend({
  players: DS.hasMany('player'),
  creator: DS.belongsTo('player', {inverse: 'game'}),
  //cards: hasMany('cards'),
  //turns: hasMany('turn'),
  name: attr(),
  code: attr(),
});
