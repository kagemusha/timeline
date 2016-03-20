# Timeline

Online version of the classic game

You are on the *standalone* branch - this branch uses Mirage fixtures and doesn't need a server.
For the server version, go to the master branch.

# Object Model

players
- hasOne Game
- hasMany Cards

Game
- hasMany Cards
- hasOne Timeline

Timeline
- hasMany Cards
- hasOne Game

Cards
- hasOne Game

- notes
  - probably some subset of all cards based on filters
  
  
