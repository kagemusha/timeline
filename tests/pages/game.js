import PageObject from '../page-object';

const {
  text,
  clickOnText,
  count
} = PageObject;

export default PageObject.create({
  clickButton: clickOnText(''),
  currentCardText: text('#CurrentCardPanel-card'),
  timelineItems: text('.Timeline-card', {multiple: true}),
  placeCard(position) {
    click(`.Timeline-placeCardButton:eq(${position+1})`)
  },
  boardShowing() {
    return count('.GameBoard') ===  1;
  },
  playerNames: text('.Game-player', {multiple: true}),
});
