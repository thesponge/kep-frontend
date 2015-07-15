import Ember from 'ember';
import ENV from "../config/environment";

export default Ember.Component.extend({
  classNames : ['text-center'],
  host       : ENV.APP.apiHost,
  namespace  : ENV.APP.apiNamespace,
  click: function() {
    this.sendAction(this.get('param'));
  },
  actions: {
    stateChange: function(event) {
      var self = this;
      Ember.run.scheduleOnce('actions', function changeState(){
        $.ajax({
          type: "PATCH",
          url: self.host + "/" + self.namespace + "/resources/" + self.aid + "/state?event=" + event,
        })
        .done(function(data){
          //console.log($.parseJSON(data));
        })
        .fail(function(){
          alert('Failed!');
        });
      });
    },
  }
});
