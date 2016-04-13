import Ember from 'ember';

const { inject } = Ember;

export default Ember.Route.extend({
  gameCode: null,
  channelService: inject.service(),
  gameService: inject.service(),

  beforeModel() {
    if (this.get('gameService.inAGame')) {
      this.transitionTo('game')
    }
  },
  joinGame(game) {
    this.get('gameService').set('game', game);
    const channelService = this.get('channelService');
    channelService.connect();
    channelService.joinChannel(`game:${game.get('id')}`);
    this.transitionTo('game');
  },

  actions: {

    createGame() {
      const code = this.controllerFor('index').get('newGameCode');
      const game = this.store.createRecord('game', {code: code});

      const playerName = this.controllerFor('index').get('playerName');
      const player = this.store.createRecord('player', {name: playerName});
      game.get("players").addObject(player);

      game.save().then((game) => {
        this.joinGame(game);
        player.unloadRecord();
      }).catch((error)=>{
        console.log(`error creating game`, error);
      });
    },

    joinGame() {
      const gameCode = this.controllerFor('index').get('joinGameCode');
      const playerName = this.controllerFor('index').get('playerName');
      const attrs = {name: playerName, gameCode: gameCode}
      const player = this.store.createRecord('player', attrs);

      player.save().then((player) => {
        this.joinGame(player.get('game'))
      });
    }
  }
});
