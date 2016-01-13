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
  turnObserver: Ember.observer('game.turns.each.[]', function() {
    Ember.run.next((() => {
      const lastTurnWrong = this.get('game.turns.lastObject.result') === false;
      console.log(`last card`, this.get('game.turns.lastObject.card.event'));
      if (lastTurnWrong) {
        this.set('showWrongModal', true);
      }
    }))
  }),

  actions: {
    placeCard(position) {
      this.get('game').placeCardAt(position);
    },
    toggleWrong() {
      this.toggleProperty('showWrongModal');
    }
  }
});