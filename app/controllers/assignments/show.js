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
    addBid: function() {
      var self = this;

      var bid = this.store.createRecord('assignmentBid', {
        assignment_id: this.get('model.id'),
        chosen: false
      })
      bid.save().then(function() {
        console.log('Saved!');
        console.log('bid: ', bid);
        self.notifications.addNotification({
            message: 'Bid #' + bid.id + ' updated!',
            type: 'success',
            autoClear: true
        });
        assignment = this.get('controllers.assignmentsShow.content');
        assignment.get('assignment_bids').addObject(bid);
        assignment.save().then(function(){
            console.log('Assignment updated!');
            self.notifications.addNotification({
                message: 'Assignment updated!',
                type: 'success',
                autoClear: true
            });
          },
          function(error){
            self.notifications.addNotification({
                message: 'Assignment not updated!',
                type: 'error',
                autoClear: true
            });
          }
        )
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
    toggleBid: function() {
      console.log('toggleBid called');
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
