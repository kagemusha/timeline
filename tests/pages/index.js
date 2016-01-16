import PageObject from '../page-object';

const {
  count,
  fillable,
  clickOnText
} = PageObject;

export default PageObject.create({
  clickButton: clickOnText(''),
  newGameButtonCount: count('.NewGame'),
  playerName1: fillable(`.playerName:eq(1)`),
  // playerName(count, value) {
  //   const descriptor = fillable(`.playerName:eq(${count})`)
  //   descriptor
  // }
});
