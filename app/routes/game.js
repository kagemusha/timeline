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
    controller.set('game', model);
    controller.set('player', this.get('gameService.player'));
  },

  actions: {
    startGame() {
      const gameId = this.controllerFor('game').get('model.id');
      const gameChannelName = `game:${gameId}`;
      const channelService = this.get('channelService');
      const gameChannel = channelService.getChannel(gameChannelName);
      channelService.setChannelCallback(gameChannelName, "game-started", ((msg) => {
        console.log(`game started msg received: ${msg}`);
      }));
      gameChannel.push("start-game").receive("error", e=> console.log(e));
    }
  }
});
