import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ["Game-player"],
  classNameBindings: ["isCurrentPlayer"],
  isCurrentPlayer: Ember.computed('currentPlayer', function(){
    return this.get('player') === this.get('currentPlayer');
  })
});
