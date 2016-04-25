import Ember from 'ember';
import ChannelService from 'ember-phoenix-channel/services/channel-service';

const { computed, inject } = Ember;

export default ChannelService.extend({
  store: inject.service(),
  gameService: inject.service(),
  game: computed.readOnly("gameService.game"),

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
        const store = this.get('store');
        store.pushPayload(gameJson.current_card);
        const currentCard = store.peekRecord('card', gameJson.current_card.card.id);
        game.currentCard = currentCard;

        const lastCardJson = gameJson.last_card;
        if (lastCardJson) {
          store.pushPayload(lastCardJson);
          const lastCard = store.peekRecord('card', lastCardJson.card.id);
          game.get('cards').addObject(lastCard);
        }
      },
      "turn-result": function(turnJson){
        console.log(`turnJson`, turnJson);
        const store = this.get('store');
        const game = this.get('game');
        if (turnJson.correct) {
          const lastCardJson = turnJson.last_card;
          store.pushPayload(lastCardJson);
          const lastCard = store.peekRecord('card', lastCardJson.card.id);
          game.get('cards').addObject(lastCard);
        }
        store.pushPayload(turnJson.current_card);
        const currentCard = store.peekRecord('card', turnJson.current_card.card.id);
        game.set('currentCard', currentCard);
      }
    },
  }
});
