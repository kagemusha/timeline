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
        const game = this.setGame(gameJson);
        game.set('isWaitingToStart', false);
      },

      "turn-result": function(turnJson){
        this.setGame(turnJson);
      }
    },
  },


  pushAndReturnObject(payload, type, id) {
    id = id || payload[type]['id'];
    const store = this.get('store');
    store.pushPayload(payload);
    return store.peekRecord(type, id);
  },

  setGame(payload) {
    const store = this.get('store');
    const game = this.get('game');
    const currentCard = this.pushAndReturnObject(payload.current_card, 'card');
    game.set('currentCard', currentCard);
    const lastPlayer = this.get('game.currentPlayer');
    const currentPlayer = store.peekRecord('player', payload.current_player);
    game.set('currentPlayer', currentPlayer);

    if (payload.correct) {
      const lastCardJson = payload.last_card;
      const lastCard = this.pushAndReturnObject(lastCardJson, 'card');
      game.get('cards').addObject(lastCard);

      // first turn is just setup so no feedback
      if (payload.turn_count > 1) {
        //may want to do this on server
        lastPlayer.decrementProperty('cardsRemaining');
      }

      if (payload.winner_id) {
        game.set('gameEnded', true);
        const winner = store.peekRecord('player', payload.winner_id);
        game.set('winner', winner)
      } else {
        console.log('Yes!!');
      }
    } else {
      console.log('Sorry!')
    }
    return game;
  },


});
