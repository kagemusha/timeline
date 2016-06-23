import Ember from 'ember';

const { computed, inject } = Ember;

export default Ember.Component.extend({
  gameService: inject.service(),
  channelService: inject.service(),
  classNames: ['GameBoard'],
  title: computed('game.name', function(){
    return this.get('game.name') || "Timeline!"
  }),
  me: computed.readOnly('gameService.player'),
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

  showFirstInstructions: computed('game.timeline.length', 'isMyTurn', function(){
    return this.get('game.timeline.length') === 1 && this.get('isMyTurn')
  }),

  showFirstRoundInstructions: computed('game.timeline.length', 'game.turnCount', 'isMyTurn', function(){
    const playerCount = this.get('game.players.length');
    const timelineLength = this.get('game.timeline.length');
    const turnCount = this.get('game.turnCount');
    return  timelineLength > 1 && turnCount <= playerCount && this.get('isMyTurn');
  }),

  firstTimelineCardYear: computed('game.timeline', function() {
    const year = this.get('game').cardAt(0).get('year');
    return `${Math.abs(year)} ${year < 0 ? " BC":""}`
  }),
  winners: computed("game.winners", function(){
    const winners = this.get('game.winners').map(player => {
      return this.get('me') === player ? "you" : player.get('name');
    }).join(", ");
    const lastWinner = winners.slice(-1)[0];
    let names = winners.replace(`, ${lastWinner}`, ` and ${lastWinner}`);
    names = Ember.String.capitalize(names);
    return `${names} won`
  }),

  lost: computed("game.winners", function(){
    return this.get("game.winners").indexOf(this.get("me")) === -1;
  }),

  noMoreCards: computed("game.winners", function(){
    const winner = this.get("game.winners").objectAt(0);
    return winner && winner.get('cardsRemaining') > 0;
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
