import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['GameBoard-player'],
  classNameBindings: ['isMe', 'isCurrentPlayer:GameBoard-currentPlayer'],
  isCurrentPlayer: Ember.computed.readOnly("player.isCurrentPlayer"),
  isMe: Ember.computed('player', 'thisPlayer', function(){
    return this.get('player') === this.get('thisPlayer');
  })
});
