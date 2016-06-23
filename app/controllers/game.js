import Ember from 'ember';
import config from '../config/environment';

export default Ember.Controller.extend({
  gameService: Ember.inject.service(),
  canLeave: config.canLeave,

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
