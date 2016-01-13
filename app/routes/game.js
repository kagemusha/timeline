import Ember from 'ember';

export default Ember.Route.extend({
  gameService: Ember.inject.service('game-service'),

  model(params) {
    if (!params.game_id || params.game_id === 'null') {
      this.transitionTo('index')
    } else {
      return this.store.findRecord('game', params.game_id)
    }
  },
  setupController(controller, model) {
    this._super(controller, model);
    this.get('gameService').set('game', model)
  },
});
