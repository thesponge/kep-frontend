/* global require, module */
var EmberApp = require('ember-cli/lib/broccoli/ember-app');
var mergeTrees = require('broccoli-merge-trees');

module.exports = function(defaults) {
  var app = new EmberApp(defaults, {
    // Add options here
    modals: {
      layout    : true,
      style     : true,
      animation : 'slide-up'
    },
    emberCliFontAwesome: {
      includeFontAwesomeAssets: true
    },
    minifyCSS: {
      enabled: true,
      options: {}
    },
  });

  // Use `app.import` to add additional libraries to the generated
  // output files.
  //
  // If you need to use different assets in different
  // environments, specify an object as the first parameter. That
  // object's keys should be the environment name and the values
  // should be the asset to use in that environment.
  //
  // If the library that you are including contains AMD or ES6
  // modules that you would like to import into your application
  // please specify an object with the list of modules as keys
  // along with the exports of each module as its value.
  app.import("bower_components/typeahead.js/dist/bloodhound.min.js");
  app.import("bower_components/typeahead.js/dist/typeahead.bundle.min.js");
  app.import("bower_components/typeahead-addresspicker/dist/typeahead-addresspicker.min.js");

  return mergeTrees([app.toTree()], { overwrite: true });

  //return app.toTree();
};
