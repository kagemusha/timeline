import Ember from 'ember';

const { inject } = Ember;

export default Ember.Route.extend({
  channelService: inject.service(),
  gameService: inject.service(),

  model() {
    return this.get('gameService.game');
  },

  afterModel(model) {
    if (!model) {
      this.transitionTo('index');
    }
  },

  setupController(controller, model) {
    this._super(controller, model);
    controller.set('channelService', this.get('channelService'));
    controller.set('game', model);
    controller.set('player', this.get('gameService.player'));
  },

  actions: {
    startGame() {
      this.get('gameService').startGame();
    },
    abandonGame() {
      this.get('gameService').clear();
      this.transitionTo('index');
    }
  }
});
