import { test } from 'qunit';
import moduleForAcceptance from 'timeline/tests/helpers/module-for-acceptance';
import indexPage from '../pages/index';
import gamePage from '../pages/game';

moduleForAcceptance('Acceptance | index', {
  beforeEach() {
    localStorage.clear();
    this.gameService = this.application.__container__.lookup('service:game-service');
    this.gameService.joinGameChannel = Ember.K;
  },
});

test('create a new game', function(assert) {
  assert.expect(3);
  visit('/');
  indexPage.playerNameInput('Herodotus');
  indexPage.newGameCodeInput('code');
  indexPage.clickCreateGame();
  andThen(() => {
    assert.equal(currentURL(), '/game', "Transitioned to game");
    assert.notOk(gamePage.boardShowing(), "Game board hidden before start");
    assert.deepEqual(gamePage.playerNames, ["Herodotus"], "Game creator shown");
  });
});


test('join a game', function(assert) {
  assert.expect(1);
  visit('/');
  indexPage.playerNameInput('Livy');
  indexPage.existingGameCodeInput('code');
  indexPage.clickJoinGame();
  andThen(() => {
    assert.equal(currentURL(), '/game', "Transitioned to game");
    assert.equal(gamePage.playerNames(), ['Herodotus', 'Livy'], "Shows players");
  });
});
