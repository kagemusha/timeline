import Ember from 'ember';

const { computed } = Ember;

export default Ember.Component.extend({
  gameService: Ember.inject.service(),
  classNames: ['GameBoard'],
  cardSorting: ['year'],
  sortedCards: computed.sort('game.cards', 'cardSorting'),
  gameEnded: computed.readOnly('game.gameEnded'),
  isMyTurn: computed('gameEnded', 'gameService.player.isCurrentPlayer', function(){
    return !this.get('gameEnded') && this.get('gameService.player.isCurrentPlayer');
  }),

  actions: {
    placeCard(position) {
      this.get('gameService').placeCard(position);
    }
  }
});
