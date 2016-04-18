import Ember from 'ember';
import ChannelService from 'ember-phoenix-channel/services/channel-service';

const { inject } = Ember;

export default ChannelService.extend({
  store: inject.service(),

  channelTopicHandlers: {
    game: {
      "added-player": function(players) {
        console.log(`added-player players`, players);
        this.get('store').pushPayload(players);
      }
    }
  }
});
