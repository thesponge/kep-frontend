import Ember from 'ember';

export default Ember.Controller.extend({
  model: function() {
    return this.store.findAll('account', function(){
      return Ember.$.getJSON('/account');
    });
  }.property(),
});

