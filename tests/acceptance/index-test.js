import { test } from 'qunit';
import moduleForAcceptance from 'timeline/tests/helpers/module-for-acceptance';
import indexPage from '../pages/index';
import gamePage from '../pages/game';

moduleForAcceptance('Acceptance | index');

test('create a new game', function(assert) {
  assert.expect(1);
  visit('/');
  indexPage.playerNameInput('Herodotus');
  indexPage.newGameCodeInput('code');
  indexPage.clickCreateGame();
  andThen(() => {
    assert.equal(currentURL(), '/game', "Transitioned to game");
    return pauseTest();
    assert.notOk(gamePage.boardShowing(), ['Herodotus'], "Shows players");
    assert.equal(gamePage.playerNames(), ['Herodotus'], "Shows players");
  });
});


test('join a game', function(assert) {
  assert.expect(1);
  visit('/');
  page.playerNameInput('Livy');
  page.existingGameCodeInput('code');
  page.clickJoinGame();
  andThen(() => {
    assert.equal(currentURL(), '/game', "Transitioned to game");
    assert.equal(gamePage.playerNames(), ['Herodotus', 'Livy'], "Shows players");
  });
});
