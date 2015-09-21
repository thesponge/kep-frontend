import Ember from 'ember';

export default Ember.Controller.extend({
  model: Ember.computed(function() {
    if (this.session.content.id !== undefined) {
      return this.store.findAll('user', this.session.content.id);
    }
  }),
});

