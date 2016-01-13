import { test } from 'qunit';
import moduleForAcceptance from 'timeline/tests/helpers/module-for-acceptance';
import page from '../pages/game';
import indexPage from '../pages/index';

moduleForAcceptance('Acceptance | game');

test('correctly placed card is added to timeline', function(assert) {
  testCardPlacement(assert, 0, ["Norman Invasion 1066", "Storming of the Bastille 1789"])
});

test('incorrectly placed card is not added to timeline', function(assert) {
  testCardPlacement(assert, -1, ["Norman Invasion 1066"])
});

function testCardPlacement(assert, position, timeline) {
  visit('/');
  indexPage.clickButton('New Game');
  andThen(function() {
    assert.equal(currentURL(), '/game/null'); //todo fix
    assert.deepEqual(page.timelineItems(), ["Norman Invasion 1066"], 'Initial timeline correct');
    assert.equal(page.currentCardText(), "Current card: Storming of the Bastille")
  });
  page.placeCard(position);
  andThen(function() {
    assert.deepEqual(page.timelineItems(), timeline);
    assert.equal(page.currentCardText(), "Current card: Declaration of Independence")
  });
}
