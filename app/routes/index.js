import Ember from 'ember';
import config from '../config/environment';

const imagesSrc = [
  'http://www.china-mike.com/wp-content/uploads/2011/03/terracotta-army-warriors-xian.png',
  'http://media.washtimes.com.s3.amazonaws.com/media/image/2015/03/18/caesar_2.jpg',
  'http://images.fineartamerica.com/images-medium-large/8-christopher-columbus-granger.jpg',
  'http://www.nasa.gov/images/content/2333main_MM_Image_Feature_19_rs4.jpg',
];

export default Ember.Route.extend({
  gameService: Ember.inject.service(),

  beforeModel() {
    if (this.get('gameService.inAGame')) {
      this.transitionTo('game')
    } else {
      const token = localStorage.getItem('timeline-token');
      if (token && token !== "undefined" && token !== "null") {
        this.store.queryRecord('player', {token: token}).then ((player) => {
          const game = player.get('game')
          this.get('gameService').joinGame(game, player);
          this.transitionTo('game');
        }).catch((error)=> {
          console.log(`Error returning to game`, error);
        });
      }
    }
  },
  model() {
    return this.store.findAll('cardset');
  },
  setupController(controller, model) {
    this._super(controller, model);
    controller.set('cardsets', model);
    controller.set('cardset', model.findBy('name', 'general'));
    controller.set('imagesSrc', imagesSrc);
    controller.set('initialCardCount', config.cardCount);
    if (config.mockInput) {
      controller.setProperties({
        'createGamePlayer': 'mm',
        'newGameCode': `m${Date.now()}`
      });
    } else {
      controller.set('newGameCode', null);
    }
    controller.set('joinGameCode', null);
  },
});
