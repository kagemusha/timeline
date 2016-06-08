import Ember from 'ember';

const { computed, inject } = Ember;

export default Ember.Service.extend({
  channelService: inject.service(),
  store: inject.service(),

  inAGame: computed.notEmpty('game'),
  game: null,
  player: null,
  channel: null,

  joinGame(game, player) {
    this.setProperties({
      game,
      player
    });
    localStorage.setItem('timeline-token', player.get('token'));
    this.joinGameChannel(game.get('id'));
  },

  joinGameChannel(gameId) {
    if (!gameId) {
      return;
    }
    const channelService = this.get('channelService');
    channelService.connect().then(()=> {
      return channelService.joinChannel(`game:${gameId}`, "game");
    }).then((channel) => {
      this.set('channel', channel);
      console.log(`gettting game state..`);
      channel.push('get-game-state').receive('error', e=> console.log(e));
    });
  },

  startGame() {
    const gameId = this.get('game.id')
    this.get('channel').push("start-game", {game_id: gameId}).receive("error", e=> console.log(e));
  },

  placeCard(position) {
    this.get('channel').push("place-card", {position: position}).receive("error", e=> console.log(e));
  },

  clear() {
    this.set('game', null);
    this.set('player', null);
    this.get('store').unloadAll();
    localStorage.clear();
    //todo: send msg to server to cleanup game and close channel
  }
});
