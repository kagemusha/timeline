import Ember from 'ember';


export default Ember.Route.extend({
  gameCode: null,
  channelService: Ember.inject.service(),

  actions: {

    createGame() {
      const code = this.controllerFor('index').get('newGameCode');
      const game = this.store.createRecord('game', {code: code});

      const playerName = this.controllerFor('index').get('playerName');
      const player = this.store.createRecord('player', {name: playerName});
      game.set("creator", player);

      game.save().then((game) => {
        this.joinGame(game);
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
