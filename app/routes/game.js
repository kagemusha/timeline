import Ember from 'ember';

const { inject } = Ember;

const imagesSrc = [
  'http://www.china-mike.com/wp-content/uploads/2011/03/terracotta-army-warriors-xian.png',
  'http://media.washtimes.com.s3.amazonaws.com/media/image/2015/03/18/caesar_2.jpg',
  'http://images.fineartamerica.com/images-medium-large/8-christopher-columbus-granger.jpg',
  'http://www.nasa.gov/images/content/2333main_MM_Image_Feature_19_rs4.jpg',
];

export default Ember.Route.extend({
  channelService: inject.service(),
  gameService: inject.service(),

  model() {
    return this.get('gameService.game');
  },

  afterModel(model) {
    if (!model) {
      this.transitionTo('index');
    }
  },

  setupController(controller, model) {
    this._super(controller, model);
    controller.set('channelService', this.get('channelService'));
    controller.set('game', model);
    controller.set('player', this.get('gameService.player'));
    controller.set('imagesSrc', imagesSrc);
  },

});
