import { test } from 'qunit';
import moduleForAcceptance from 'timeline/tests/helpers/module-for-acceptance';
import page from '../pages/index';
import gamePage from '../pages/game';

moduleForAcceptance('Acceptance | index');

test('visiting /', function(assert) {
  visit('/');

  andThen(function() {
    assert.equal(currentURL(), '/');
    assert.equal(page.newGameButtonCount(), 1);
  });
});


test('create game', function(assert) {
  visit('/');
  page.playerName1('yuma')
  page.clickButton('New Game')
  andThen(function() {
    assert.equal(currentURL(), '/game/null'); //todo fix
    assert.deepEqual(gamePage.playerNames(), ['Herodotus', 'yuma'])
  });
});
