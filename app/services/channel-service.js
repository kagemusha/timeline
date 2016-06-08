import Ember from 'ember';
import ChannelService from 'ember-phoenix-channel/services/channel-service';
import config from '../config/environment';

const { computed, inject } = Ember;

export default ChannelService.extend(Ember.Evented, {
  store: inject.service(),
  gameService: inject.service(),
  game: computed.readOnly("gameService.game"),
  host: config.APP.socketEndpoint,

  channelTopicHandlers: {

    game: {
      "added-player": function(players) {
        console.log(`added-player players`, players);
        this.get('store').pushPayload(players);
      },

      "game-started": function(gameJson){
        console.log(`game-started`, gameJson);
        this.setGame(gameJson);
      },

      "turn-result": function(turnJson){
        console.log(`turn-result`, turnJson);
        this.setGame(turnJson);
      },
      "game-state": function(game){
        this.get('store').pushPayload(game);
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
    store.pushPayload({game: payload.game});
    const game = this.get('game');

    // first turn is just setup so no feedback
    if (game.get('turnCount') > 1) {
      if (payload.correct) {
        game.set('lastPlayer.cardsRemaining', payload.last_player_cards_remaining);
      }
      this.trigger('lastMoveResult', {correct: payload.correct, position: payload.position});
    }
    return game;
  },


});
