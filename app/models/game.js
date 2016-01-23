import Ember from 'ember';
import DS from 'ember-data';
import _ from 'lodash/lodash';

const { hasMany } = DS;
const { computed } = Ember;

export default DS.Model.extend({
  players: hasMany('player'),
  cards: hasMany('cards'),
  turns: hasMany('turn'),
  pile: DS.attr('array'),

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
  addResult(result) {
    const cardIndex = this.get('pile').shift();
    const card = this.get('cards').objectAt(cardIndex);
    const turn = this.store.createRecord('turn', {
      card: card,
      result
    })
    this.get('turns').addObject(turn)
  },
  placeCardAt(position) {
    const cardIndex = this.get('currentCardIndex')
    const card = this.get('cards').objectAt(cardIndex);
    const cardYear = card.get('year')
    const timeline = this.get('timelineCards');
    const priorYear = position === -1 ? -5000000000 : timeline.objectAt(position).get('year');

    const placedAtEnd = position === timeline.get('length') - 1;
    // up this sometime before the year 30000 edition ;-)
    const nextYear = placedAtEnd ? 3000 : timeline.objectAt(position+1).get('year');

    const result = (cardYear >= priorYear && cardYear <= nextYear);
    this.addResult(result);
  },
  // base on turns, as pile doesn't propagate updates (since no a model?)
  currentCardIndex: computed('turns.[]', function(){
    const pile = this.get('pile')
    return Ember.isEmpty(pile) ? -1 : this.get('pile')[0]
  }),
  currentCard: computed('currentCardIndex', 'cards', function(){
    const index =  this.get('currentCardIndex')
    return index > -1 ? this.get('cards').objectAt(index) : null
  }),

  restart(){
    this.getPile();
    this.addResult(true);
  },

  getPile() {
    const cardLength = this.get('cards.length');
    let pile = Array.from(Array(cardLength).keys());
    pile = _.shuffle(pile)
    this.set('pile', Ember.A(pile))
  },

});
