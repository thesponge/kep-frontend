import Ember from 'ember';

export default Ember.Component.extend({
  usr: function() {
    return this.get('targetObject.store').find('user', 2);
  }.property(),

  afterRender: function() {
  var message = "Some alert message going here";
  var promise = this.get('dialogManager').alert(message);
    promise.then(function() {
      console.log("You are informative!");
    });
  }
});
