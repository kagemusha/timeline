//import Ember from 'ember';
import DS from 'ember-data';
import config from '../config/environment';

export default DS.JSONAPIAdapter.extend({
  namespace: 'api',
  host: "http://localhost:4000"
  //headers: Ember.computed(function(){
  //  let headers = {};
  //  let authToken = this.session.get('currentUser.authToken');
  //  if (authToken) {
  //    headers["Authorization"] = "Bearer " + authToken;
  //  }
  //  return headers;
  //}).volatile(),
});
