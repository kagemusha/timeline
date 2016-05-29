import Mirage from 'ember-cli-mirage';

export default function() {
  this.post('api/games', (db, request)=> {
    const gameRequest = JSON.parse(request.requestBody).game;
    const gameCode = gameRequest.code;
    const playerName = gameRequest.players[0].name;

    const gameResponse = {"game": {
                    "id":1,
                    "code": gameCode,
                    "status": 'waiting-to-start',
                    "players":[
                      {"total_cards":2,
                       "token":"token",
                        "name": playerName,"is_creator":true,"id":12,"cards_remaining":2}],
                      }
                  };
    return new Mirage.Response(201, {}, gameResponse);
  });

  this.post('api/players', (db, request)=> {
    const player = JSON.parse(request.requestBody).player;
    const response = {"player": {
                        "token":"token",
                        "name": player.name,
                        "is_creator": false,
                        "id":1,
                        "game":1,
                        "cards_remaining": 5},
                        "game":[{"id": 1,
                                "name":null,
                                "status": 'waiting-to-start',
                                "code": player.game_code
                              }]

                      }
    console.log(`post`, player);
    return new Mirage.Response(201, {}, response);
  });
}

