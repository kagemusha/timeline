import Ember from 'ember';

const { computed } = Ember;

export default Ember.Service.extend({
  inAGame: computed.notEmpty('game'),
  game: null,
  player: null
});
