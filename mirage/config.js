export default function() {

  this.post('api/games', (db, request)=> {
    const game = JSON.parse(request.requestBody);
    debugger
    game.data.players[0]["is-creator"] = true;

    return game;
  });

  this.post('api/player', (db, request)=> {
    const game = JSON.parse(request.requestBody);
    game.data.player = [game.data.creator];

    console.log(`post`, game);
    return game;
  });
}

