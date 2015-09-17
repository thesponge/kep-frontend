import Ember from 'ember';

export default Ember.Controller.extend({
  //assignment: function() {
  //  return this.store.createRecord('assignment');
  //}.property(),
  newAssignment: null,
  rewards_select: function() {
    return this.store.findAll('assignment-reward');
  }.property(),
  skills_select: function() {
    var output = [];
    this.store.findAll('skill').then(function(records){
      records.forEach(function(item){

        var filter = output.filter(function(obj) {
              return obj.text === item.get('category');
            });

        if (filter.length === 0) {
          output.push({
            text: item.get('category'),
            children:[
              {
                id: item.get('id'),
                text: item.get('name')
              }
            ]
          });
        } else {
          var index = output.indexOf(filter[0]);
          output[index].children.push(
            {
              id: item.get('id'),
              text: item.get('name')
            }
          );
        }
      });
    });

    return output;
  }.property(),
  actions: {
    submitAssignment: function() {
      console.log("Title: ", this.get('newAssignment.title'));
      console.log("Description: ", this.get('newAssignment.description'));
      console.log("newAssignment", this.get('newAssignment'));
      var self = this;
      self.get('newAssignment').save().then(function() {
        //this.get('assignments').pushObject(self.get('assignment'));
        self.notifications.addNotification({
            message: 'Assignment #' + self.get('newAssignment').id + ' created!',
            type: 'success',
            autoClear: true
        });
        self.transitionToRoute('assignments.show', self.get('newAssignment'));
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
      this.get('newAssignment').deleteRecord();
      self.transitionToRoute('match.dashboard');
    }
  },
});
