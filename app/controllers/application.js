import Ember from 'ember';

export default Ember.Controller.extend({
  model: function() {
    if (this.session.content.id !== undefined) {
      return this.store.findAll('user', this.session.content.id);
    }
  }.property(),
});

