import Ember from 'ember';

const { get, computed } = Ember;

const props = ['top','bottom','left','right'];

export default Ember.Component.extend({

  style: Ember.computed('top','bottom','left','right', function(){
    const attrsArray = props.map(attr => {
      const value = this.get(attr)
      return Ember.isPresent(value) ? `${attr}:${value}` : "";
    });
    return attrsArray.join(";");
  }),

  errorMessage: computed('errors', 'errorKey', function(){
    return get(this.get('errors'), this.get('errorKey'));
  }),
  hasError: computed.bool('errorMessage'),

});
