import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { AssertMore } from 'timeline/tests/helpers/assert-more';

moduleForComponent('player-item', 'Integration | Component | player item', {
  integration: true
});

test('it renders', function(assert) {
  const assertm = new AssertMore(assert, this);
  this.set('player', {name: "Einstein", cardsRemaining: 42});
  this.render(hbs`{{player-item player=player}}`);
  assertm.textEqual('.GameBoard-playerName', 'Einstein');
  assertm.textEqual('.GameBoard-playerCardsRemaining', '42 cards left');
});

