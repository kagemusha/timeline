import Ember from 'ember';

export default Ember.Component.extend({
  //gameService: Ember.inject.service(),
  classNames: ['game'],
  //game: Ember.computed.readOnly("gameService.game"),
  currentCard: Ember.computed.readOnly("game.currentCard"),

  didInsertElement() {
    const game = this.get('game');
    game.restart();
  },

  actions: {
    placeCard(position) {
      console.log(`place at`, position);
      this.get('game').placeCardAt(position);
    }
  }
});