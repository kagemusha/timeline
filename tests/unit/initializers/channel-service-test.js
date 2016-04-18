import Ember from 'ember';
import ChannelServiceInitializer from 'timeline/initializers/channel-service';
import { module, test } from 'qunit';

let application;

module('Unit | Initializer | channel service', {
  beforeEach() {
    Ember.run(function() {
      application = Ember.Application.create();
      application.deferReadiness();
    });
  }
});

// Replace this with your real tests.
test('it works', function(assert) {
  ChannelServiceInitializer.initialize(application);

  // you would normally confirm the results of the initializer here
  assert.ok(true);
});
