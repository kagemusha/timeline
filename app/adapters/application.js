//import Ember from 'ember';
import DS from 'ember-data';
import config from '../config/environment';

export default DS.RESTAdapter.extend({
  namespace: 'api',
  host: config.APP.SERVER,
});
