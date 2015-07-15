import Ember from 'ember';
import ENV from "../../../config/environment";

export default Ember.Route.extend({
  host          : ENV.APP.apiHost,
  namespace     : ENV.APP.apiNamespace,
  assignment_id : null,
  matches       : function() { return []; }.property(),
  activate: function() {
  },
  model: function(params, transition) {
    console.log('ass id: ', transition.handlerInfos[4].params.assignment_id);
    this.assignment_id = transition.handlerInfos[4].params.assignment_id;
  },
  setupController: function(controller){
    var self = this;
    controller.set('assignment_id', self.assignment_id);
    Ember.run(function() {
      //$.ajax({
      //  type: "GET",
      //  url: self.host + "/" + self.namespace + "/score_account_assignments/assignment_matches?assignment_id=" + self.assignment_id,
      //})
      //.then(function(data){
      //  self.matches = data.score_account_assignments;
      //})
      //.fail(function(){
      //  alert('Failed!');
      //});
      $.getJSON(self.host + "/" + self.namespace + "/score_account_assignments/assignment_matches?assignment_id=" + self.assignment_id)
      .then(function(data){
        //self.matches = data.score_account_assignments;
        controller.set('model', data.score_account_assignments);
      })
      .fail(function(){
        alert('Failed!');
      });
    });
    //Ember.run(function() {
      //controller.set('model', self.matches);
    //});
  },

});
