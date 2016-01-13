# Timeline

Online version of the classic game


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
  
  
