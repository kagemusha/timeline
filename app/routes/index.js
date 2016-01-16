import Ember from 'ember';

const INITIAL_PLAYER_COUNT = 4;

export default Ember.Route.extend({
  setupController(controller, model) {
    this._super(controller, model);
    let players = [];
    for(let i = 0; i < INITIAL_PLAYER_COUNT; i++) {
      players.push(this.store.createRecord('player', {name: null, cardsRemaining: 10}));
    }
    players[0].set('name', 'Herodotus');
    controller.set('players', players)
  },

  actions: {
    newGame() {
      const game = this.store.createRecord('game');
      let players = this.controllerFor('index').get('players').filter(player => !!player.get('name'))
      game.set('players', players);
      this.store.findAll('card').then((cards) => {
        game.set('cards', cards);
        this.transitionTo('game', game);
      });
    }
  }
});
