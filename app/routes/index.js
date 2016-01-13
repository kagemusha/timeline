import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    newGame() {
      const game = this.store.createRecord('game');
      this.store.findAll('card').then((cards) => {
        game.set('cards', cards);
        this.transitionTo('game', game);
      });
    }
  }
});
