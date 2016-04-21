import Ember from 'ember';

const { computed, inject } = Ember;

export default Ember.Service.extend({
  channelService: inject.service(),

  inAGame: computed.notEmpty('game'),
  game: null,
  player: null,
  channel: null,

  joinGame(game, player) {
    this.setProperties({
      game,
      player
    });
    const gameId = this.get('game.id');
    const channelService = this.get('channelService');
    channelService.connect();
    const channel = channelService.joinChannel(`game:${gameId}`, "game");
    this.set('channel', channel);
  },

  startGame() {
    const gameId = this.get('game.id')
    this.get('channel').push("start-game", {game_id: gameId}).receive("error", e=> console.log(e)); }
});
