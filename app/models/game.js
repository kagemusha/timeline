import Ember from 'ember';
import DS from 'ember-data';

const { hasMany } = DS;
const { computed } = Ember;

export default DS.Model.extend({
  players: hasMany('player'),
  cards: hasMany('cards'),
  turns: hasMany('turn'),

  playedCards: computed('turns.each.[]', function(){
    const turns = this.get('turns');
    return turns.mapBy('card');
  }),
  timelineCards: computed('playedCards.each.[]', function(){
    const turns = this.get('turns').filterBy('result', 'right');
    return turns ? turns.mapBy('card').sortBy('year') : [];
  }),
  discardedCards: computed('playedCards.each.[]', function(){
    const turns = this.get('turns').filterBy('result', 'wrong');
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
      result: result
    })
    this.get('turns').addObject(turn)
  },
  placeCardAt(position) {
    const card = this.get('currentCard');
    const cardYear = card.get('year')
    const timeline = this.get('timelineCards');
    const priorYear = position === -1 ? -5000000000 : timeline.objectAt(0).get('year');

    const placedAtEnd = position === timeline.get('length') - 1;
    // up this sometime before the year 30000 edition ;-)
    const nextYear = placedAtEnd ? 3000 : timeline.objectAt(position+1).get('year');

    const result = (cardYear >= priorYear && cardYear <= nextYear) ? "right" : "wrong"
    this.addResult(result);
  },
  currentCard: computed.readOnly('pile.firstObject'),
  restart(){
    this.shuffleCards();
    this.addResult('right');
  }


});
