import Ember from 'ember';
import ENV from "../../../config/environment";

export default Ember.Route.extend({
  host          : ENV.APP.apiHost,
  namespace     : ENV.APP.apiNamespace,
  assignment_id : null,
  matches       : null,
  activate: function() {
  },
  model: function(params, transition) {
    this.assignment_id = transition.handlerInfos[4].params.assignment_id;
  },
  setupController: function(controller){
    var self = this;
    Ember.run.scheduleOnce('actions', function changeState(){
      $.ajax({
        type: "GET",
        url: self.host + "/" + self.namespace + "/score_account_assignments/assignment_matches?assignment_id=" + self.assignment_id,
      })
      .done(function(data){
        self.matches = data.score_account_assignments;
      })
      .fail(function(){
        alert('Failed!');
      });
    });
    controller.set('matches', self.matches);
  },

});
