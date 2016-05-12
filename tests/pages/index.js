import PageObject from '../page-object';

const {
  fillable,
} = PageObject;

export default PageObject.create({
  createPlayerNameInput: fillable(`.CreatePlayerName`),
  joinPlayerNameInput: fillable(`.JoinPlayerName`),
  createGameCodeInput: fillable(`.CreateGameCode`),
  joinGameCodeInput: fillable(`.JoinGameCode`),
  cardCountInput: fillable('.CardCount'),
  existingGameCodeInput: fillable(`.ExistingGameCode`),
});
