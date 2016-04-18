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
  joinGame(game, player) {
    this.get('gameService').set('game', game);
    this.get('gameService').set('player', player);
    const channelService = this.get('channelService');
    channelService.connect();
    channelService.joinChannel(`game:${game.get('id')}`, "game");
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
        //ember data is putting returned player as a new player
        //get rid of initial player and set player to returned player
        player.unloadRecord();
        const newPlayer = this.store.peekAll('player').findBy('name', playerName);
        this.joinGame(game, newPlayer);
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
        this.joinGame(player.get('game'), player)
      });
    }
  }
});
