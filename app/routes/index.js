import Ember from 'ember';


export default Ember.Route.extend({
  gameCode: null,

  actions: {
    newGame() {
      const code = this.controllerFor('index').get('newGameCode');
      const game = this.store.createRecord('game', {code: code});
      game.save().then((game) => {
        this.transitionTo('game', game);
      });
    },
    joinGame() {
      const code = this.controllerFor('index').get('gameCode');
      this.store.queryRecord('game', {code: code}).then((game) => {
        this.transitionTo('game', game);
      })
    }
  }
});
