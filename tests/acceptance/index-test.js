import { test } from 'qunit';
import moduleForAcceptance from 'timeline/tests/helpers/module-for-acceptance';
import page from '../pages/index';
//import gamePage from '../pages/game';

moduleForAcceptance('Acceptance | index');

test('create a new game', function(assert) {
  assert.expect(0);
  visit('/');
  page.playerNameInput('Herodotus');
  page.newGameCodeInput('code');
  page.clickCreateGame();
  andThen(() => {
    assert.equal(currentURL(), '/game', "Transitioned to game");
  });
});


//test('join a game', function(assert) {
//  assert.expect(0);
//  visit('/');
//  page.clickJoinGame();
//});
