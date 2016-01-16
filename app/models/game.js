import Ember from 'ember';
import DS from 'ember-data';

const { hasMany } = DS;
const { computed } = Ember;

export default DS.Model.extend({
  players: hasMany('player'),
  cards: hasMany('cards'),
  turns: hasMany('turn'),

  playerCardCounts: DS.attr(),

  createPlayers(players) {
    players = players.filter(player => !!player.get('name'));
    players.forEach( (player) => {
      this.get('players').addObject(this.store.createRecord('player', player))
    })
  },
  playedCards: computed('turns.each.[]', function(){
    const turns = this.get('turns');
    return turns.mapBy('card');
  }),
  lastCardIfWrong: computed('playedCards.each.[]', function(){
    const lastTurn = this.get('turns.lastObject');
    const lastWasWrong = lastTurn && (lastTurn.get('result') === false )
    return lastWasWrong ? lastTurn.get('card') : false;
  }),
  timelineCards: computed('playedCards.each.[]', function(){
    const turns = this.get('turns').filterBy('result', true);
    return turns ? turns.mapBy('card').sortBy('year') : [];
  }),
  discardedCards: computed('playedCards.each.[]', function(){
    const turns = this.get('turns').filterBy('result', false);
    return turns ? turns.mapBy('card').sortBy('year') : [];
  }),
  pile: computed('cards','playedCards.each.[]', function(){
    const cards = this.get('cards');
    const playedCards = this.get('playedCards');
    if (Ember.isBlank(playedCards)) {
      return cards;
    }

    //must do this b/c playedCards are promise objects
    const playedEvents = playedCards.mapBy('event');
    return cards.filter(function(card){
      return playedEvents.indexOf(card.get('event')) === -1;
    });
  }),
  shuffleCards() {

  },
  addResult(result) {
    const turn = this.store.createRecord('turn', {
      card: this.get('currentCard'),
      result
    })
    this.get('turns').addObject(turn)
  },
  placeCardAt(position) {
    const card = this.get('currentCard');
    const cardYear = card.get('year')
    const timeline = this.get('timelineCards');
    const priorYear = position === -1 ? -5000000000 : timeline.objectAt(position).get('year');

    const placedAtEnd = position === timeline.get('length') - 1;
    // up this sometime before the year 30000 edition ;-)
    const nextYear = placedAtEnd ? 3000 : timeline.objectAt(position+1).get('year');

    const result = (cardYear >= priorYear && cardYear <= nextYear);
    this.addResult(result);
  },
  currentCard: computed.readOnly('pile.firstObject'),
  restart(){
    this.shuffleCards();
    this.addResult(true);
  },

});
