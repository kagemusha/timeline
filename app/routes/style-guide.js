import Ember from 'ember';

const players = [
  {name: 'Livy', cardsRemaining: 10, isCreator: true},
  {name: 'Gibbons', cardsRemaining: 10, isCreator: false}
];
const cards = [
  {event: "ember-cli project initiated", year: 2013},
  {event: "Ruby invented", year: 1995},
  {event: "Elixir invented", year: 2012},
  {event: "Sproutcore becomes Ember", year: 2011},
  {event: "Golang invented", year: 2009},
  {event: "Lisp released", year: 1958},
  {event: "Rails released", year: 2005},
  {event: "Unix development begins", year: 1969},
  {event: "Erlang appears", year:  1986 },
  {event: "Advent of Javascript", year: 1995},
  {event: "JQuery released", year: 2006},
];

function addHasMany(store, parent, manyType, manyAttribute, items) {
  items.forEach((item)=> {
    const model = store.createRecord(manyType, item);
    parent.get(manyAttribute).addObject(model);
  });
}

export default Ember.Route.extend({
  gameService: Ember.inject.service(),

  model() {
    const game = this.store.createRecord('game');
    game.name = 'My Great Game';
    game.code = 'join-me';
    game.currentCard = this.store.createRecord('card', cards.shift());
    addHasMany(this.store, game, 'player', 'players', players);
    addHasMany(this.store, game, 'card', 'cards', cards);

    this.mockCardPlacement();
    return game;
  },

  deactivate() {
    const gameService = this.get('gameService');
    gameService.placeCard = this.get('realPlaceCardMethod');
  },

  mockCardPlacement() {
    const gameService = this.get('gameService');
    this.set('realPlaceCardMethod', gameService.placeCard);
    gameService.placeCard = function (game, sortedCards, position) {
      console.log(`mockPlaceCard`, position);
      const currentCard = game.get('currentCard');
      const currentCardYear = currentCard.get('year');
      let correct = false;
      if (position === -1 && currentCardYear <= sortedCards.objectAt(0).get('year')) {
        correct = true
      } else if (position === (cards.get('length') - 1) && currentCardYear >= sortedCards.get('lastObject').get('year')){
        correct = true
      } else {
        const priorCardYear = sortedCards.objectAt(position).get('year');
        if (currentCardYear >= priorCardYear) {
          const nextCardYear = sortedCards.objectAt(position+1).get('year');
          if (currentCardYear <= nextCardYear) {
            correct = true;
          }
        }
      }

      if (correct) {
        game.get('cards').addObject(currentCard);
      } else {
        alert('Incorrect!');
      }
    }
  }
});
