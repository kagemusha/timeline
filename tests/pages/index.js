import PageObject from '../page-object';

const {
  count,
  clickOnText
} = PageObject;

export default PageObject.create({
  clickButton: clickOnText(''),
  newGameButtonCount: count('.NewGame'),
});
