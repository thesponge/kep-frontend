import Ember from 'ember';

export default Ember.Controller.extend({
  newResource: null,
  intentions_select: function() {
    var output = [];
    this.store.fetchAll('intention').then(function(records){
      records.forEach(function(item){
        output.push({id: item.get('id'), text: item.get('intention')});
      });
    });

    return output;
  }.property(),
  actions: {
    submitResource: function() {
      console.log("Title: ", this.get('newResource.title'));
      console.log("Description: ", this.get('newResource.description'));
      console.log("Travel: ", this.get('newResource.travel'));
      console.log("Driving license: ", this.get('newResource.driver_license'));
      var self = this;
      self.get('newResource').save().then(function() {
        //this.get('resources').pushObject(self.get('resource'));
        self.notifications.addNotification({
            message: 'Resource #' + self.get('newResource').id + ' created!',
            type: 'success',
            autoClear: true
        });
        self.transitionToRoute('resources.show', self.get('newResource'));
      },
      function(response) {
        console.error('There was a problem', response);
        Object.keys(response.errors).map(function(value, index) {
          console.log(index);
          response.errors[value].map(function(v, i){
            self.notifications.addNotification({
              message: i + '. ' + value + ' ' + v,
              type: 'error',
              autoClear: true,
              clearDuration: 2500
            });
          });
        });
      }
      );
    },
    cancel: function(){
      var self = this;
      this.get('newResource').deleteRecord();
      self.transitionToRoute('match.dashboard');
    }
  },
});
