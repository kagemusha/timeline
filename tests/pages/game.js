import PageObject from '../page-object';

const {
  text,
  clickOnText,
  textList
} = PageObject;

export default PageObject.create({
  clickButton: clickOnText(''),
  currentCardText: text('#CurrentCardPanel-card'),
  timelineItems: textList('.Timeline-card'),
  placeCard(position) {
    click(`.Timeline-placeCardButton:eq(${position+1})`)
  },
  playerNames: textList('.Game-playerName'),
  cardsRemaining: textList('.Game-cardsRemaining')
});
