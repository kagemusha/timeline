import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { AssertMore } from 'timeline/tests/helpers/assert-more';

moduleForComponent('game-board', 'Integration | Component | game board', {
  integration: true
});


// test timeline appears
// players appear
// next card appears
// current player has current player class
// last move
// abandon game?

test('it renders', function(assert) {
  const assertm = new AssertMore(assert, this);

  const gameCode = "The Great Game";
  // Handle any actions with this.on('myAction', function(val) { ... });
  const jackie = {name: "Jackie", cardsRemaining: 5};
  const steve = {name: "Steve", cardsRemaining: 5};
  const players = [ jackie, steve ];
  const currentCard = {event: "Javascript", year: 1995};
  const cards = [ {event: "Ember.js", year: 2011},
                  {event: "JQuery", year: 2006}
                ];
  const game = { code: gameCode, players: players, cards: cards, currentCard};
  this.set('jackie', jackie);
  this.set('game', game);
  this.render(hbs`{{game-board game=game player=jackie}}`);

  assertm.textEqual(".GameBoard-header h2", gameCode);
  assertm.multilineTextEqual('.GameBoard-player', ['Jackie', '5 cards left', 'Steve', '5 cards left']);
  assertm.textEqual(".GameBoard-status", "Good luck everyone!!");
  assertm.textEqual(".GameBoard-currentCard", currentCard.event);

  //card order is sorted
  assertm.multilineTextEqual(".GameBoard-cards", [cards[1].event, ''+cards[1].year, cards[0].event, ''+cards[0].year]);
});

