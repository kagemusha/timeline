import Ember from 'ember';

const { computed } = Ember;

export default Ember.Component.extend({
  tagName: "",
  showButton: computed('isComplete', 'isMyTurn', function(){
    return this.get('isMyTurn') && !this.get('isComplete');
  }),

  actions: {
    placeCard() {
      this.sendAction('placeCard', this.get('position'));
    }
  }
});
