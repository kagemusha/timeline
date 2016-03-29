import Ember from 'ember';

export default Ember.Route.extend({
  channelService: Ember.inject.service(),

  actions: {
    startGame() {
      const gameId = this.controllerFor('game').get('model.id');
      const gameChannelName = `game:${gameId}`;
      const channelService = this.get('channelService');
      const gameChannel = channelService.getChannel(gameChannelName);
      channelService.setChannelCallback(gameChannelName, "game-started", ((msg) => {
        console.log(`game started msg received`);
      }));
      gameChannel.push("start-game").receive("error", e=> console.log(e));
    }
  }
});
