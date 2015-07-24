import Ember from 'ember';

export default Ember.Component.extend({
  modelName: "",
  usr: function() {
    // get model's id, provided it's the last segment in the URL (exactly our case)
    var modelName = this.modelName;
    var id = window.location.pathname.split('/').reverse()[0];

    var owner = null;
    var self = this;

    // find out which is the owner for our model
    this.get('targetObject.store').find(modelName, id).then(function(data){
      owner = data.get('owner');
      return self.get('targetObject.store').find('user', owner);
    });

    // return the user corresponding to the owner's ID
  }.property(),

  //afterRender: function() {
  //var message = "Some alert message going here";
  //var promise = this.get('dialogManager').alert(message);
    //promise.then(function() {
      //console.log("You are informative!");
    //});
  //}
});
