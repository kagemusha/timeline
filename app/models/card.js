import DS from 'ember-data';

const { attr } = DS;

export default DS.Model.extend({
  game: DS.belongsTo('game'),
  event: attr(),
  year: attr()
});
