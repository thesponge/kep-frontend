import Ember from 'ember';
import ApplicationRouteMixin from 'ember-modals/mixins/routes/application';

export default Ember.Route.extend(ApplicationRouteMixin, {
  titleToken: 'Profile',
  actions: {
    modalForModel: function(template, model){
      console.log('Setting template ' + template + ' for model ' + model);
      //this.controller.showModal(template);
      var modal = this.controller.get('modal');
      var self = this;

      //console.log('options: ', container);
      // Set the properties...
      modal.setProperties({
        template: template,
        //controller, 'account',
        //defaultOutlet: 'backup-modal',
        model: this.get(self.model)
      });

      // ... Then render the modal
      modal.show();
    },
    modalFor: function(template){
      //this.controller.showModal(template);
      var modal = this.controller.get('modal');

      //console.log('options: ', container);
      // Set the properties...
      modal.setProperties({
        template: template,
        //controller, 'account',
        //defaultOutlet: 'backup-modal',
        model: this.get('content')
      });

      // ... Then render the modal
      modal.show();
    },

    setupController: function(controller){
      var intention = this.store.createRecord('intention');
      controller.set('newIntention', intention);
    }

    //addIntentions: function() {
      //this.modalFor('candy');
    //},
    //closeAddIntentions: function() {
      //this.modalFor('account/update/affiliations');
    //},

  }
});
