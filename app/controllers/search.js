import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    executeSearch: function() {
      console.log('Search!');
    },
  }
});
