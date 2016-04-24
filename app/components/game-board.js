import Ember from 'ember';

export default Ember.Component.extend({
  gameService: Ember.inject.service(),
  classNames: ['GameBoard'],
  cardSorting: ['year'],
  sortedCards: Ember.computed.sort('game.cards', 'cardSorting'),

  actions: {
    placeCard(position) {
      this.get('gameService').placeCard(this.get('game'), this.get('sortedCards') , position);
    }
  }
});
