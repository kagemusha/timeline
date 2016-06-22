import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('place-card-button', 'Integration | Component | place card button', {
  integration: true
});

test('button displays when game in progress and is my turn', function(assert) {
  this.render(hbs`{{place-card-button isComplete=false isMyTurn=true}}`);
  assert.equal(this.$(".GameBoard-placeCardButton").length, 1, "button displays");
});

test('button hidden when not my turn', function(assert) {
  this.render(hbs`{{place-card-button isComplete=false isMyTurn=false}}`);
  assert.equal(this.$(".GameBoard-placeCardButton").length, 0, "button hidden");
});

test('button hidden when game complete', function(assert) {
  this.render(hbs`{{place-card-button isComplete=true isMyTurn=true}}`);
  assert.equal(this.$(".GameBoard-placeCardButton").length, 0, "button hidden");
});
