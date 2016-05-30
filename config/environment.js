/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'timeline',
    environment: environment,
    baseURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    }
  };

  if (environment === 'production') {
    ENV.APP.host = "phoenix-timeline.herokuapp.com";
    ENV.APP.httpEndpoint = 'http://' + ENV.APP.host;
    ENV.APP.socketEndpoint = 'ws://' + ENV.APP.host + '/socket';
  }

  if (environment === 'development') {
    ENV.APP.host = "localhost:4000";
    ENV.APP.httpEndpoint = 'http://' + ENV.APP.host;
    ENV.APP.socketEndpoint = 'ws://' + ENV.APP.host + '/socket';
    ENV['ember-cli-mirage'] = {
      enabled: false
    };
    ENV.contentSecurityPolicy = {
      'default-src': "*",
      'connect-src': "*",
      'script-src': "* 'unsafe-inline'",
      'style-src': " 'self' 'unsafe-inline'"
    };
    ENV['ember-cli-mirage'] = {
      enabled: false
    }
  }

  if (environment === 'test') {
    ENV.APP.httpProtocol = "";
    ENV.APP.socketProtocol = "";
    // Testem prefers this...
    ENV.baseURL = '/';
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {

  }

  return ENV;
};
