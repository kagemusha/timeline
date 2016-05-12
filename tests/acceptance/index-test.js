/* global localStorage */
import Ember from 'ember';
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
  assert.expect(5);
  visit('/');
  indexPage.createPlayerNameInput('Herodotus');
  indexPage.createGameCodeInput('code');
  indexPage.cardCountInput('8');
  indexPage.clickOn('Create Game');
  andThen(() => {
    assert.equal(currentURL(), '/game', "Transitioned to game");
    assert.notOk(gamePage.boardShowing(), "Game board hidden before start");
    assert.deepEqual(gamePage.playerNames, ["Herodotus"], "Game creator shown");
    assert.ok(gamePage.contains('Start Game'));
    assert.ok(gamePage.contains('Abandon Game'));
  });
});


test('join a game', function(assert) {
  assert.expect(3);
  visit('/');
  indexPage.joinPlayerNameInput('Livy');
  indexPage.joinGameCodeInput('code');
  indexPage.clickOn('Join Game');
  andThen(() => {
    assert.equal(currentURL(), '/game', "Transitioned to game");
    assert.deepEqual(gamePage.playerNames, ['Livy'], "Shows players");
    // todo: mock channel so have at least game creator
    assert.ok(gamePage.contains('Leave Game'));
  });
});
