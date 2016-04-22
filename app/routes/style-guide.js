import Ember from 'ember';

const players = [
  {name: 'Livy', cardsRemaining: 10, isCreator: true},
  {name: 'Gibbons', cardsRemaining: 10, isCreator: false}
];
const cards = [
  {event: "Ruby invented", year: 1995},
  {event: "Elixir invented", year: 2012},
  {event: "Ember.js released", year: 2011},
  {event: "Rails released", year: 2005},
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

  model() {
    const game = this.store.createRecord('game');
    game.name = 'My Great Game';
    game.code = 'join-me';
    addHasMany(this.store, game, 'player', 'players', players);
    cards.forEach((card)=> {
      const model = this.store.createRecord('card', card);
      game.get('cards').addObject(model);
    });
    return game;
  },

});
