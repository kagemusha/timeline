import { test } from 'qunit';
import moduleForAcceptance from 'timeline/tests/helpers/module-for-acceptance';
import page from '../pages/index';

moduleForAcceptance('Acceptance | index');

test('visiting /', function(assert) {
  visit('/');

  andThen(function() {
    assert.equal(currentURL(), '/');
    assert.equal(page.newGameButtonCount(), 1);
  });
});
