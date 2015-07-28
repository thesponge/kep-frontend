/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'kep-ember',
    environment: environment,
    baseURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      }
    },
    emberDevTools: {global: true},

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
      'ember-cli-notifications': {
          includeFontAwesome: true
      },
    },
    'ember-cli-toggle': {
      includedThemes: ['light', 'default', 'flip', 'skewed'],
      defaultShowLabels: false, // defaults to false 
      defaultTheme: 'default',   // defaults to 'default' 
      defaultSize: 'small',    // defaults to 'medium' 
      defaultOff: 'True',     // defaults to 'Off' 
      defaultOn: 'False'        // defaults to 'On' 
    },
    pace: {
    
      // addon-specific options to configure theme 
      theme: 'flash',
      color: 'red',
      
      // pace-specific options 
      // learn more on http://github.hubspot.com/pace/#configuration 
      catchupTime: 50,
      initialRate: .01,
      minTime: 100,
      ghostTime: 50,
      maxProgressPerFrame: 20,
      easeFactor: 1.25,
      startOnPageLoad: true,
      restartOnPushState: true,
      restartOnRequestAfter: 500,
      target: 'body',
      elements: {
        checkInterval: 100,
        selectors: ['body', '.ember-view']
      },
      eventLag: {
        minSamples: 10,
        sampleCount: 3,
        lagThreshold: 3
      },
      ajax: {
        trackMethods: ['GET', 'POST', 'DELETE', 'OPTIONS'],
        trackWebSockets: true,
        ignoreURLs: []
      }
    }
  };

  if (environment === 'development') {
    ENV.APP.apiHost = 'http://localhost:3000';
    ENV.APP.apiNamespace = 'v1';
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.baseURL = '/';
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'staging') {
    ENV.APP.apiHost = 'http://api.staging.kep.thesponge.eu';
    ENV.APP.apiNamespace = 'v1';

  }

  if (environment === 'production') {
    ENV.APP.apiHost = 'http://api.kep.thesponge.eu';
    ENV.APP.apiNamespace = 'v1';

  }

  ENV['simple-auth'] = {
    authorizer: 'simple-auth-authorizer:devise',
    crossOriginWhitelist: ['*']
  };
  ENV['simple-auth-devise'] = {
    tokenAttributeName: 'token',
    identificationAttributeName: 'email',
    serverTokenEndpoint: ENV.APP.apiHost + '/users/sign_in'
  };
  ENV.contentSecurityPolicy = {
    'default-src': "'self'",
    'script-src': "'self' 'unsafe-eval' 'unsafe-inline' *",
    'font-src': "'self' http://fonts.gstatic.com",
    'connect-src': "'self' http://0.0.0.0:3000 https://api.mixpanel.com http://localhost:3000 http://localhost:35729",
    'img-src': "'self' *",
    'style-src': "'self' 'unsafe-inline' http://fonts.googleapis.com",
    'media-src': "'self'",
    'report-uri': "http://localhost:4200"
  }
  ENV.sassOptions = {
    //includePaths: [
      //'bower_components/foundation/scss'
    //]
  }

  return ENV;
};
