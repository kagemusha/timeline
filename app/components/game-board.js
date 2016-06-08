import Ember from 'ember';

const { computed, inject } = Ember;

export default Ember.Component.extend({
  gameService: inject.service(),
  channelService: inject.service(),
  classNames: ['GameBoard'],
  isMyTurn: computed('gameEnded', 'gameService.player.isCurrentPlayer', function(){
    return !this.get('gameEnded') && this.get('gameService.player.isCurrentPlayer');
  }),

  statusMsg: computed("game.turnCount", function(){
    return this.get("game.turnCount") === 1 ? "Good luck everyone!!" : null;
  }),

  hasLastMove: computed.gt("game.turnCount", 1),
  beforeCard: computed("game.turnCount", function(){
    const game = this.get('game');
    return game.cardAt(game.get('lastPlacement'));
  }),

  afterCard: computed("game.turnCount", function() {
    const game = this.get('game')
    const offset = game.get('lastResult') ? 2 : 1;
    return game.cardAt(game.get('lastPlacement') + offset);
  }),

  actions: {
    placeCard(position) {
      this.get('gameService').placeCard(position);
    },
    playAgain() {
      this.get('playAgain')();
    },
    leaveGame() {
      this.get('leaveGame')();
    },
  }
});
