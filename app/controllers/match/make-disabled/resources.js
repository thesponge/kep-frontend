import Ember from 'ember';

export default Ember.Controller.extend({
  model: Ember.computed(function() {
    return this.store.findAll('resource');
  }),
});
