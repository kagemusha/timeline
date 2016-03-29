import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['game'],


  actions: {
    placeCard(position) {
      console.log(`place card TBD`);
    },
    toggleWrong() {
      this.toggleProperty('showWrongModal');
    }
  }
});