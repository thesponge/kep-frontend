import Ember from 'ember';


export default Ember.Controller.extend({
  showNotification: function(message, type){
    this.get('notifications').addNotification({
      message: message,
      type: type,
      autoClear: true
    })
  },
  model: function(params){
    return this.store.find('account', params);
  }.property(),
  newIntention: null,

  updateAttribute: function(property) {
    this.set('model.account.'+property, this.get('model.account.'+property))
    this.get('model.account').save().then(function(){
      this.showNotification('Success!', 'success');
      this.get('modal').hide();
    }.bind(this),
    function(response){
      this.showNotification('There was an error!', 'error');
      this.get('modal').hide();
    }.bind(this))
  },
  actions: {
    updateBio: function() {
      this.updateAttribute('bio');
    },
    updateDisplayName: function() {
      this.updateAttribute('display_name');
    },
    updateUrl: function() {
      this.updateAttribute('url');
    },
    updateIntentions: function() {
      this.updateAttribute('intention_ids');
    },
    updateSkills: function() {
      this.updateAttribute('skill_ids');
    },
    updateAffiliations: function() {
      this.updateAttribute('affiliation_ids');
    },

    addIntentions: function(){
      // save stuff here
    },

    showAddIntentions: function() {
      this.modalFor('account/update/new/intentions');
    },
    closeAddIntentions: function() {
      this.modalFor('account/update/intentions');
    },
    saveAddIntentions: function() {
      console.log("Intention: ", this.get('newIntention'));
      console.log("self: ", this);
      var self = this;
      self.get('newIntention').save().then(function(){
        self.notifications.addNotification({
            message: 'Intention #' + self.get('newIntention').id + ' created!',
            type: 'success',
            autoClear: true
        });
        this.modalFor('account/update/intentions');
      });
    },
  },

  modalFor: function(template){
    //this.controller.showModal(template);
    var modal = this.get('modal');

    // Set the properties...
    modal.setProperties({
      template: template,
      //controller, 'account',
      //defaultOutlet: 'backup-modal',
      model: this.get('content')
    });

    modal.show();
  },

  intentions_select: function() {
    var data = this.store.find('intention');
    return data;
  }.property(),

  affiliations_select: function() {
    return this.store.find('affiliation');
  }.property(),
  languages_select: function() {
    return this.store.find('language');
  }.property(),
  skills_select: function() {
    var output = [];
    var data = this.store.fetchAll('skill').then(function(records){
      records.forEach(function(item){

        var filter = output.filter(function(obj) {
              return obj.text == item.get('category');
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
});
