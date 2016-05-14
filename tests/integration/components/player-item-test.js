import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('player-item', 'Integration | Component | player item', {
  integration: true
});

test('it renders', function(assert) {
  const assertEqualText = getEqualTest(assert, this);
  this.set('player', {name: "Einstein", cardsRemaining: 42});
  this.render(hbs`{{player-item player=player}}`);
  assertEqualText('.GameBoard-playerName', 'Einstein');
  assertEqualText('.GameBoard-playerCardsRemaining', '42 cards left');
});

function getEqualTest(assert, context) {
  return function (selector, expected) {
    assert.equal(context.$(selector).text().trim(), expected);
  }
}