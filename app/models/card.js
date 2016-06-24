import Ember from 'ember';
import DS from 'ember-data';

const { attr } = DS;
const months = ["Jan","Feb", "Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

export default DS.Model.extend({
  game: DS.belongsTo('game'),
  event: attr(),
  year: attr(),
  month: attr(),
  timeLabel: Ember.computed('year', 'month', function(){
    const month = months[this.get('month')];
    const year = this.get('year');
    const bc = year < 0 ? " BC":"";
    const absYear = Math.abs(year);
    return `${month ? month + " ":""}${absYear}${bc}`
  })
});
