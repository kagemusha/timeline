import Ember from 'ember';


export default Ember.Route.extend({
  gameCode: null,
  channelService: Ember.inject.service(),

  actions: {
    newGame() {
      const code = this.controllerFor('index').get('newGameCode');
      const game = this.store.createRecord('game', {code: code});
      game.save().then((game) => {
        const channelService = this.get('channelService');
        channelService.joinChannel(`game:${game.get('id')}`);
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
