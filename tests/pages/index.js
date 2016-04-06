import PageObject from '../page-object';

const {
  fillable,
  clickable
} = PageObject;

export default PageObject.create({
  clickCreateGame: clickable('.CreateGameButton'),
  clickJoinGame: clickable('.JoinGameButton'),
  playerNameInput: fillable(`.PlayerName`),
  newGameCodeInput: fillable(`.NewGameCode`),
  existingGameCodeInput: fillable(`.ExistingGameCode`),
});
