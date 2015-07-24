import Ember from 'ember';
import ENV from "../../config/environment";


export default Ember.Controller.extend({
  apiHost       : ENV.APP.apiHost,
  apiNamespace  : ENV.APP.apiNamespace,
  showNotification: function(message, type){
    this.get('notifications').addNotification({
      message: message,
      type: type,
      autoClear: true
    });
  },
  model: function(params){
    return this.store.find('account', params);
  }.property(),
  newIntention: null,

  updateAttribute: function(property) {
    this.set('model.account.' + property, this.get('model.account.' + property));
    this.get('model.account').save().then(function(){
      this.showNotification('Success!', 'success');
      this.get('modal').hide();
    }.bind(this),
    function(){
      this.showNotification('There was an error!', 'error');
      this.get('modal').hide();
    }.bind(this));
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
    updateLanguages: function() {
      this.updateAttribute('language_ids');
    },
    updateAffiliations: function() {
      this.updateAttribute('affiliation_ids');
    },
    updateLocations: function() {
      //console.log('model.account.location: ', this.get('model.account.location'));
      // Split the input CSV address by comma+space sequence
      var elements = this.get('model.account.location').split(', ');
      // City is always the first element
      var city     = elements[0];
      // Country is last
      var country  = elements[elements.length - 1];
      // Remove country and city. If there's anything left, that'd be the state's name
      elements.splice(elements.indexOf(country), 1);
      elements.splice(elements.indexOf(city), 1);
      var state    = elements[0];
      // Now let's see it works
      //console.log('country, state, city: ', country, state, city);
      //console.log('elements: ', elements);
      //return false;

      var self = this;
      Ember.run.scheduleOnce('actions', function changeState(){
        // TODO: better variable interpolation
        $.ajax({
          type: "POST",
          url : self.apiHost + "/" + self.apiNamespace + "/locations",
          data: '{"location": '
            +'{'
              +'"city":    "' + city    + '",'
              +'"state":   "' + state   + '",'
              +'"country": "' + country + '"'
            +'}'
          +'}',
          contentType: 'application/json',
        })
        .done(function(data){
          console.log('location_ids ', self.get('model.account'));
          console.log('data.id ', data.id);
          self.set('model.account.location_ids', [data.id]);
          self.get('model.account').save().then(function(){
            self.showNotification('Success!', 'success');
            self.get('modal').hide();
          },
          function(){
            self.showNotification('There was an error!', 'error');
            self.get('modal').hide();
          });
        })
        .fail(function(){
          alert('Failed!');
        });
      });
      //this.get('model.account').save().then(function(){
      //  this.showNotification('Success!', 'success');
      //  this.get('modal').hide();
      //}.bind(this),
      //function(){
      //  this.showNotification('There was an error!', 'error');
      //  this.get('modal').hide();
      //}.bind(this));
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
      console.log("Intention: ", this.get('model.account.newIntention'));
      console.log("self: ", this);
      var self = this;
      console.log('newIntention: ', self.get('model.account.newIntention'));
      Ember.run.scheduleOnce('actions', function changeState(){
        // TODO: better variable interpolation
        $.ajax({
          type: "POST",
          url : self.apiHost + "/" + self.apiNamespace + "/intentions",
          data: '{"intention": {'
            +'"intention":    "' + self.get('model.account.newIntention') + '"'
            +'} }',
          contentType: 'application/json',
        })
        .done(function(data){
          self.set('model.account.intention_ids', [data.id]);
          self.get('model.account').save().then(function(){
            self.showNotification('Success!', 'success');
            self.modalFor('account/update/intentions');
          },
          function(){
            self.showNotification('There was an error!', 'error');
            self.modalFor('account/update/intentions');
          });
        })
        .fail(function(){
          alert('Failed!');
        });
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
    this.store.fetchAll('skill').then(function(records){
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
});
