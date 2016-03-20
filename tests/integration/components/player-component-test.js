import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('player-component', 'Integration | Component | player component', {
  integration: true
});

test('it renders', function(assert) {
  
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +
  this.set('player', {name: 'Livy', cardsRemaining: 10});
  this.render(hbs`{{player-component player=player}}`);

  assert.equal(this.$('.Game-playerName').text().trim(), 'Livy');
  assert.equal(this.$('.Game-cardsRemaining').text().trim(), '10');

});
