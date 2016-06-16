import DS from 'ember-data';

const { attr } = DS;
const months = ["Jan","Feb", "Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
export default DS.Model.extend({
  game: DS.belongsTo('game'),
  event: attr(),
  year: attr(),
  month: attr(),
  timeLabel: Ember.computed('year', 'month', function(){
    const month = this.get('month');
    return `${month ? months[month] + " ":""}${this.get('year')}`
  })
});
