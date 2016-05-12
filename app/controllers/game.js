import Ember from 'ember';

export default Ember.Controller.extend({
  gameService: Ember.inject.service(),

  actions: {
    startGame() {
      this.get('gameService').startGame();
    },
    abandonGame() {
      this.get('gameService').clear();
      this.transitionToRoute('index');
    }
  }
});
