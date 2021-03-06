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
        var assignmentsController = this.controllerFor('assignments.show');
        console.log('step 2');
        assignmentsController.set('model',
                 this.store.findAll('assignment', params.queryParams.match)
                );
    }
  },
  afterModel: function() {
  },
  setupController: function(controller, model){
    this.store.findAll('assignment').then(function(items){
      //console.log('first resource: ', items.get('firstObject'));
      if (typeof items.get('firstObject') !== 'undefined') {
        controller.set('firstAssignmentId', items.get('firstObject').id);
      }
      controller.set('model', model);
    });
  },
  actions: {
    match: function(){
      console.log('step 1');
      this.controller.set('match', (Math.floor(Math.random() * 6) + 1));
    },
    matchExit: function(){
      console.log('Called matchExit from resources route');
      this.controller.set('match', undefined);
      this.controllerFor('assignments.show').set('match', null);
      this.render('null', {
        outlet: 'match',
        into: 'resources/show'
      });
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
      newMatch.set('j_id', this.controller.match);
      newMatch.set('r_id', this.context.id);
      console.log('Called sendMatch from resources route.');
      console.log('Resource: ', this.context.id,
                    ', assignment: ', this.controller.match);
      var self = this;
      //console.log('newMatch: ', newMatch);
      newMatch.save().then(function(){
        self.notifications.addNotification({
          message: 'Yay, you made a match!',
          type: 'success'
        });
      });
    }
  },
  renderTemplate: function(params){
    this.render();
    //this.render('account/username', {
    //  outlet: 'username',
    //  into: 'resources/show',
    //  controller: 'account.show'
    //});

    var match = params.match;
    if(match !== null && typeof match !== "undefined") {
      Ember.$('assignments-container .rollmask').show();
      var assignmentsController = this.controllerFor('assignments.show');
      console.log('rT params: ', match);
      assignmentsController.set('match', match);
      assignmentsController.set('matchBase', true);
      assignmentsController.set('model',
               this.store.findAll('assignment', match)
              );

      this.render('assignments/show', {
        outlet: 'match',
        into: 'resources/show',
        controller: 'assignments.show'
      });
    }
  }
});

