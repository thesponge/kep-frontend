import Ember from 'ember';
import ApplicationRouteMixin from 'ember-modals/mixins/routes/application';

export default Ember.Route.extend(ApplicationRouteMixin, {
  queryParams: {
    match: {
      replace: true,
      refreshModel: true
    }
  },
  beforeModel: function(params){
    var match = params.queryParams.match;
    if(match !== undefined) {
      console.log('bM params: ', params.queryParams.match);
        var resourcesController = this.controllerFor('resources.show');
        console.log('step 2');
        resourcesController.set(
          'model',
          this.store.findAll('resource', params.queryParams.match)
        );
    }
  },
  setupController: function(controller, model){
    // controller.set('assignment-match', Ember.computed.alias('score-account-assignment'));
    //this.store.find('assignment-match', {assignment_id: '8'}).then(function(){
    ////this.store.find('score-account-assignment', {assignment_id: '8'}).then(function(items){
    //  console.log('Found some matches!');
    //});
    this.store.findAll('resource').then(function(items){
      //console.log('first resource: ', items.get('firstObject'));
      if (typeof items.get('firstObject') !== 'undefined') {
        controller.set('firstResourceId', items.get('firstObject').id);
      }
      controller.set('model', model);
      controller.get('model').reload().then(function(model){
        console.log('model reloaded', model);
        console.log('model initial_rewards', controller.get('model.initial_rewards'));
        console.log('model isReloading', controller.get('model.isReloading'));
      });
    });
  },
  actions: {
    //statePrivate: function() {
    //  alert('state: private');
    //},
    match: function(){
      console.log('step 1');
      this.controller.set('match', (Math.floor(Math.random() * 6) + 1));
    },
    matchExit: function(){
      console.log('Called matchExit from assignments route');
      this.controller.set('match', null);
      this.controllerFor('resources.show').set('match', undefined);
      this.render('null', {
        outlet: 'match',
        into: 'assignments/show'
      });
    },
    showAutomatchModal: function() {
      //this.controller.showModal('assignments/automatch/automatch-popup');
      ////Ember.$('#drop1').hide();
      //Ember.$('#drop1-btn').trigger('click.fndtn.dropdown');
      this.transitionTo('assignments.show.automatches');
    },
    showMatchModal: function() {
      this.controller.showModal('match/match-modal');
      this.render('match/match-modal-column', {
        outlet: 'assignment',
        into: 'match/match-modal',
        controller: 'assignments.show'
      });
      this.render('match/match-modal-column', {
        outlet: 'resource',
        into: 'match/match-modal',
        controller: 'resources.show'
      });
    },
    sendMatch: function() {
      var newMatch        = this.store.createRecord('match');
      //newMatch.assignment_id     = this.controller.match;
      //newMatch.resource_id = this.context.id;
      newMatch.set('j_id', this.context.id);
      newMatch.set('r_id', this.controller.match);
      console.log('Called sendMatch from resources route.');
      console.log('Resource: ', this.controller.match,
                    ', assignment: ', this.context.id);
      var self = this;
      //console.log('newMatch: ', newMatch);
      newMatch.save().then(function(){
        self.notifications.addNotification({
          message: 'Yay, you made a match!',
          type: 'success'
        });
      });
    },
    getRSVP: function() {
      var url = 'http://localhost:3000/v1/assignment_bids';
      return new Promise(function(resolve, reject){
        var xhr = new XMLHttpRequest();

        xhr.open('POST', url);
        xhr.onreadystatechange = handler;
        xhr.responseType = 'json';
        xhr.setRequestHeader('Accept', 'application/json');
        xhr.send();

        function handler() {
          if (this.readyState === this.DONE) {
            if (this.status === 200) {
              resolve(this.response);
            } else {
              reject(new Error('getJSON: `' + url + '` failed with status: [' + this.status + ']'));
            }
          }
        }
      });
    }
  },
  renderTemplate: function(params){
    this.render();

    var match = params.match;
    if(match !== null && typeof match !== "undefined") {
      Ember.$('resources-container .rollmask').show();
      var resourcesController = this.controllerFor('resources.show');
      console.log('rT params: ', match);
      resourcesController.set('match', match);
      resourcesController.set('matchBase', true);
      resourcesController.set('model',
               this.store.findAll('resource', match)
              );

      this.render('resources/show', {
        outlet: 'match',
        into: 'assignments/show',
        controller: 'resources.show'
      });
    }
  }
});
