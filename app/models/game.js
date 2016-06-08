import Ember from 'ember';
import DS from 'ember-data';

const { attr, hasMany } = DS;
const { computed } = Ember;

export default DS.Model.extend({
  players: hasMany('player'),
  cards: hasMany('card'),
  timeline: attr('array'),
  timelineCards: computed.map('timeline', function(cardId){
    return this.store.peekRecord('card', cardId);
  }),

  name: attr(),
  code: attr(),
  status: attr(),
  turnCount: attr(),
  initialCardCount: attr(),
  waitingToStart: computed.equal('status', 'waiting-to-start'),
  started: computed.not('waitingToStart'),
  isComplete: computed.equal('status', 'complete'),
  lastCardId: attr(),
  lastPlacement: attr(),
  lastResult: attr(),
  lastCard: computed('lastCardId', function(){
    return this.store.peekRecord('card', this.get('lastCardId'));
  }),
  currentCardId: attr(),
  currentCard: computed('currentCardId', function(){
    return this.store.peekRecord('card', this.get('currentCardId'));
  }),
  currentPlayerId: attr(),
  currentPlayer: computed('currentPlayerId', function(){
    return this.store.peekRecord('player', this.get('currentPlayerId'));
  }),
  lastPlayerId: attr(),
  lastPlayer: computed('lastPlayerId', function(){
    return this.store.peekRecord('player', this.get('lastPlayerId'));
  }),
  winnerId: attr(),
  winner: computed('winnerId', function(){
    return this.store.peekRecord('player', this.get('winnerId'));
  }),

  cardAt(position) {
    const timeline = this.get('timeline');
    if (position < 0 || position >= timeline.get('length')) {
      return null;
    }
    return this.store.peekRecord('card', timeline[position]);
  }
});
