import Ember from 'ember';

export default Ember.View.extend({
  didInsertElement: function() {
    $("section.top-bar-section button.search-button").click(function(){
      alert('You clicked! Oh noes!');
    });
  },
});
