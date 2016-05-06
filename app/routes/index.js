import Ember from 'ember';

const { inject } = Ember;

export default Ember.Route.extend({
  gameCode: null,
  channelService: inject.service(),
  gameService: inject.service(),

  beforeModel() {
    if (this.get('gameService.inAGame')) {
      this.transitionTo('game')
    } else {
      const token = localStorage.getItem('timeline-token');
      if (token && token !== "undefined" && token !== "null") {
        this.store.queryRecord('player', {token: token}).then ((player) => {
          this.joinGame(player.get('game'), player)
        }).catch((error)=> {
          console.log(`Error returning to game`, error);
        });
      }
    }
  },
  joinGame(game, player) {
    this.get('gameService').joinGame(game, player);
    this.transitionTo('game');
  },

  actions: {

    createGame() {
      const code = this.controllerFor('index').get('newGameCode');
      const game = this.store.createRecord('game', {code: code});

      const playerName = this.controllerFor('index').get('createGamePlayer');
      const player = this.store.createRecord('player', {name: playerName});
      game.get("players").addObject(player);

      game.save().then((game) => {
        //ember data is putting returned player as a new player
        //get rid of initial player and set player to returned player
        player.unloadRecord();
        Ember.run.debounce(this, ()=>{
          const newPlayer = this.store.peekAll('player').findBy('name', playerName);
          this.joinGame(game, newPlayer);
        }, 10);
      }).catch((error)=>{
        console.log(`error creating game`, error);
      });
    },

    joinGame() {
      const gameCode = this.controllerFor('index').get('joinGameCode');
      const playerName = this.controllerFor('index').get('joinGamePlayer');
      const attrs = {name: playerName, gameCode: gameCode}
      const player = this.store.createRecord('player', attrs);

      player.save().then((player) => {
        this.joinGame(player.get('game'), player)
      });
    }
  }
});
