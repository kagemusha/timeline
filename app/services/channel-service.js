import Ember from 'ember';
import ChannelService from 'ember-phoenix-channel/services/channel-service';

const { computed, inject } = Ember;

export default ChannelService.extend({
  store: inject.service(),
  gameService: inject.service(),
  game: computed.readOnly("gameService.game"),

  pushAndReturnObject(payload, type, id) {
    id = id || payload[type]['id'];
    const store = this.get('store');
    store.pushPayload(payload);
    return store.peekRecord(type, id);
  },

  channelTopicHandlers: {

    game: {
      "added-player": function(players) {
        console.log(`added-player players`, players);
        this.get('store').pushPayload(players);
      },

      "game-started": function(gameJson){
        const game = this.get('game');
        console.log(`game-started message`, game);
        this.set('gameService.game.isWaitingToStart', false);
        const currentCard = this.pushAndReturnObject(gameJson.current_card, 'card');
        game.set('currentCard', currentCard);

        const lastCardJson = gameJson.last_card;
        if (lastCardJson) {
          const lastCard = this.pushAndReturnObject(lastCardJson, 'card');
          game.get('cards').addObject(lastCard);
        }
      },

      "turn-result": function(turnJson){
        console.log(`turnJson`, turnJson);
        const game = this.get('game');
        if (turnJson.correct) {
          const lastCardJson = turnJson.last_card;
          const lastCard = this.pushAndReturnObject(lastCardJson, 'card');
          game.get('cards').addObject(lastCard);
        } else {
          alert("Sorry!");
        }
        const currentCard = this.pushAndReturnObject(turnJson.current_card, 'card');
        game.set('currentCard', currentCard);
      }
    },

  }
});
