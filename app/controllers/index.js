import Ember from 'ember';

const { inject, isBlank } = Ember;
const cardCountRange = Array.from(Array(51).keys()).slice(1);

export default Ember.Controller.extend({
  gameService: inject.service(),
  i18n: inject.service(),
  cardCountRange,
  initialCardCount: 4,
  cardset: null, //set in route
  createGameErrors: {},
  joinGameErrors: {},

  joinGame(game, player) {
    this.get('gameService').joinGame(game, player);
    this.transitionToRoute('game');
  },
  actions: {
    cardsetChanged(cardset) {
      console.log(`ccc`, cardset.get('displayName'));
      this.set('selectedCardset', cardset);
    },
    cardCountChanged(count) {
      this.set('initialCardCount', count);
    },
    createGame() {
      const errors = {};
      const code = this.get('newGameCode');
      if (isBlank(code)) {
        errors.blankGameCode = this.get('i18n') .t('errors.blank.game.code');
      }

      const playerName = this.get('createGamePlayer');
      if (isBlank(playerName)) {
        errors.blankPlayerName = this.get('i18n') .t('errors.blank.player.name');
      }

      this.set('createGameErrors', errors)
      if (Object.keys(errors).length > 0) {
        return;
      }

      const cardCount = this.get('initialCardCount');
      const game = this.store.createRecord('game', {code: code, initialCardCount: cardCount});
      const player = this.store.createRecord('player', {name: playerName});
      game.get("players").addObject(player);
      game.set('cardset', this.get('cardset'));

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
      const errors = {};
      const code = this.get('joinGameCode');
      if (isBlank(code)) {
        errors.blankGameCode = this.get('i18n') .t('errors.blank.game.code');
      }

      const playerName = this.get('joinGamePlayer');
      if (isBlank(playerName)) {
        errors.blankPlayerName = this.get('i18n') .t('errors.blank.player.name');
      }

      this.set('joinGameErrors', errors)
      if (Object.keys(errors).length > 0) {
        return;
      }

      const attrs = {name: playerName, gameCode: code}
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
