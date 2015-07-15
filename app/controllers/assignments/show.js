import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: ['match'],
  match: null,
  actions: {
    deleteAssignment: function() {
      var self = this;
      var id = self.get('model').id;
      this.get('model').destroyRecord().then(function() {
        self.notifications.addNotification({
            message: 'Assignment #' + id + ' deleted!',
            type: 'success',
            autoClear: true
        });
        this.transitionToRoute('match.dashboard');
      }.bind(this));
    },
    editAssignment: function() {
      var self = this;
      self.transitionToRoute('assignments.edit', self.get('model'));
    },
    addBid: function(model) {
      var self = this;

      var bid = this.store.createRecord('assignmentBid', {
        assignment_id: this.get('model.id'),
      })
      bid.save().then(function() {
        console.log('Saved!');
        console.log('bid: ', bid);
        self.notifications.addNotification({
            message: 'Bid #' + bid.id + ' updated!',
            type: 'success',
            autoClear: true
        });
      },
      function(response) {
        console.error('There was a problem', response);
        Object.keys(response.errors).map(function(value, index) {
          console.log('Response value, index: ', value, index);
          response.errors[value].map(function(v, i){
            self.notifications.addNotification({
              message: i + '. ' + value + ' ' + v,
              type: 'error',
              autoClear: true,
              clearDuration: 2500
            });
          });
        });
      });
    },
  },
  setupController: function(controller, model) {
  //  model.reload();
    controller.set('model', model);
    //controller.set('isOwner', function(){
      //return this.model.user_id === user.id;
    //});
  }
});
