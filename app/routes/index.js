import Ember from 'ember';

const INITIAL_PLAYER_COUNT = 4;
const INITIAL_CARD_COUNT = 15;

export default Ember.Route.extend({
  gameCode: null,

  setupController(controller, model) {
    this._super(controller, model);
    let players = [];
    for(let i = 0; i < INITIAL_PLAYER_COUNT; i++) {
      players.push(this.store.createRecord('player', {name: null, cardsRemaining: INITIAL_CARD_COUNT}));
    }
    players[0].set('name', 'Herodotus');
    players[1].set('name', 'Livy');
    players[2].set('name', 'Gibbons');
    controller.set('players', players)
    controller.set('gameCode', 'game2')
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
    },
    joinGame() {
      const code = this.controllerFor('index').get('gameCode');
      this.store.queryRecord('game', {code: code}).then((game) => {
        this.transitionTo('game', game);
      })
    }
  }
});
