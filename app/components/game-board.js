import Ember from 'ember';

const { computed, inject } = Ember;

export default Ember.Component.extend({
  gameService: inject.service(),
  channelService: inject.service(),
  classNames: ['GameBoard'],
  cardSorting: ['year'],
  sortedCards: computed.sort('game.cards', 'cardSorting'),
  gameEnded: computed.readOnly('game.gameEnded'),
  isMyTurn: computed('gameEnded', 'gameService.player.isCurrentPlayer', function(){
    return !this.get('gameEnded') && this.get('gameService.player.isCurrentPlayer');
  }),
  statusMsg: "Good luck everyone!!",

  didInsertElement() {
    this.get('channelService').on('lastMoveResult', (move)=> {
      this.set('statusMsg', null);
      this.set('lastMove', move);
      this.setBeforeAndAfterCards(move);
    });
  },

  setBeforeAndAfterCards(move) {
    const position = move.position;
    const timeline = this.get('sortedCards');

    const beforeCard = position > -1 ? timeline.objectAt(position) : null;
    this.set('beforeCard', beforeCard);

    const offset = move.correct ? 2 : 1;
    let afterCard = null;
    if (position < timeline.length - offset) {
      afterCard = timeline.objectAt(position + offset);
    }
    this.set('afterCard', afterCard);
  },

  actions: {
    placeCard(position) {
      this.get('gameService').placeCard(position);
    },
    playAgain() {
      this.get('playAgain')();
    }
  }
});
