import Ember from 'ember';

export default Ember.Route.extend({
  setupController(controller, model) {
    this._super(controller, model);
    let names = new Array(4).fill(null);
    names[0] = 'Herodotus'
    names = names.map(name => Ember.Object.create({name: name}))
    controller.set('names', names)
  },
  actions: {
    newGame() {
      const game = this.store.createRecord('game');
      let names = this.controllerFor('index').get('names')
      names = names.mapBy('name');
      game.createPlayers(names);
      this.store.findAll('card').then((cards) => {
        game.set('cards', cards);
        this.transitionTo('game', game);
      });
    }
  }
});
