import Mirage from 'ember-cli-mirage';

export default function() {
  this.post('api/games', (db, request)=> {
    const gameRequest = JSON.parse(request.requestBody).game;
    const gameCode = gameRequest.code;
    const playerName = gameRequest.players[0].name;

    const gameResponse = {"game": {
                    "id":1,
                    "code": gameCode,
                    "players":[
                      {"total_cards":2,
                       "token":"token",
                        "name": playerName,"is_creator":true,"id":12,"cards_remaining":2}],
                      }
                  };
    return new Mirage.Response(201, {}, gameResponse);
  });

  this.post('api/player', (db, request)=> {
    const game = JSON.parse(request.requestBody);
    game.data.player = [game.data.creator];

    console.log(`post`, game);
    return game;
  });
}

