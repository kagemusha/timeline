import PageObject from '../page-object';

const {
  text,
  clickOnText,
  textList,
  count
} = PageObject;

export default PageObject.create({
  clickButton: clickOnText(''),
  currentCardText: text('#CurrentCardPanel-card'),
  timelineItems: textList('.Timeline-card'),
  placeCard(position) {
    click(`.Timeline-placeCardButton:eq(${position+1})`)
  },
  boardShowing() {
    return count('.GameBoard') ===  1;
  },
  playerNames: textList('.Game-player'),
  cardsRemaining: textList('.Game-cardsRemaining')
});
