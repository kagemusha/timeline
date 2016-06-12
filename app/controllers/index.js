import Ember from 'ember';

const { computed, inject, isBlank } = Ember;
const cardCountRange = Array.from(Array(101).keys()).slice(1);

const errorMsgs = {
  "game-not-found": "No code found for <strong>"
}
export default Ember.Controller.extend({
  gameService: inject.service(),
  cardCountRange: cardCountRange,
  initialCardCount: 4,

  joinGame(game, player) {
    this.get('gameService').joinGame(game, player);
    this.transitionToRoute('game');
  },

  actions: {
    selectedCardCount(count) {
      console.log(`cc`, count);
      this.set('initialCardCount', count);
    },
    createGame() {
      const code = this.get('newGameCode');
      const cardCount = this.get('initialCardCount');
      const game = this.store.createRecord('game', {code: code, initialCardCount: cardCount});

      const playerName = this.get('createGamePlayer');
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
      const gameCode = this.get('joinGameCode');
      const playerName = this.get('joinGamePlayer');
      const attrs = {name: playerName, gameCode: gameCode}
      const player = this.store.createRecord('player', attrs);

      player.save().then((player) => {
        const game = player.get('game');
        this.get('gameService').joinGame(game, player);
        this.transitionToRoute('game');
      }).catch(error=>{
        this.set("errorMessage", error.errors[0].detail);
      });
    }
  }
});
