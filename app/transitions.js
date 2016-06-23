const gameStartedDuration = 600;

export default function(){
  this.transition(
    this.fromRoute('index'),
    this.toRoute('game'),
    this.use('toLeft'),
    this.reverse('toRight')
  );

  this.transition(
    this.hasClass('game-started'),
    this.toValue(true),
    this.use('crossFade',  { duration: gameStartedDuration }),
    this.reverse('crossFade',  { duration: gameStartedDuration })
  );
}