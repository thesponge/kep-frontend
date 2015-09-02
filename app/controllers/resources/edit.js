import Ember from 'ember';

export default Ember.Controller.extend({
  rewards_select: function() {
    return this.store.findAll('resource-reward');
  }.property(),
  intentions_select: function() {
    var output = [];
    this.store.findAll('intention').then(function(records){
      records.forEach(function(item){
        output.push({id: item.get('id'), text: item.get('intention')});
      });
    });

    return output;
  }.property(),
  actions: {
    updateResource: function() {
      var selected_intentions = this.get('resource.intentions_select2');
      var selected_intentions_output = [];
      selected_intentions.forEach(function(item){
        selected_intentions_output.push(item.id);
      });
      console.log('intention ids: ', selected_intentions_output);
      console.log("Title: ", this.get('resource.title'));
      this.set('resource.title', this.get('resource.title'));
      console.log("Description: ", this.get('resource.description'));
      this.set('resource.description', this.get('resource.description'));
      this.set('resource.intention_ids', selected_intentions_output);
      console.log('intention ids: ', this.get('resource.intention_ids'));
      //console.log("Travel: ", this.get('resource.travel'));
      //this.set('resource.travel');
      //console.log("Driving license: ", this.get('resource.driver_license'));
      //this.set('resource.driver_license');

      var self = this;
      self.get('resource').save().then(function() {
        console.log('Saved!');
        self.notifications.addNotification({
            message: 'Resource #' + self.get('resource').id + ' updated!',
            type: 'success',
            autoClear: true
        });
        self.transitionToRoute('resources.show', self.get('resource'));
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
      this.get('resource').rollback();
      this.transitionToRoute('resources.show', this.get('resource'));
    }
  }
});
