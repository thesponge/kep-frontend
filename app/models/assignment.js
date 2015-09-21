import Ember from 'ember';
import DS from 'ember-data';

var attr = DS.attr;

var Assignment = DS.Model.extend({
  submissionType          : 'assignment',
  title                   : attr('string'),
  description             : attr('string'),
  state                   : attr('string'),
  user                    : DS.belongsTo('user', {inverse: 'assignments', async: true}),
  skills                  : DS.hasMany('skill', {inverse : 'assignment', async : true, embedded : 'always'}),
  assignment_rewards      : DS.hasMany(
    'assignment-reward',
    {inverse : 'assignment', async : true, embedded : 'always'}
  ),
  assignment_bids         : DS.hasMany(
    'assignment-bid',
    {inverse : 'assignment', async : true, embedded : 'always'}
  ),
  assignment_priorities   : DS.hasMany(
    'assignment-priority',
    {inverse : 'assignment', async : true, embedded : 'always'}
  ),
  languages               : DS.hasMany('language', {inverse : 'assignment', async : true, embedded : 'always'}),
  locations               : DS.hasMany('location', {inverse : 'assignment', async : true, embedded : 'always'}),
  skill_ids               : attr(),
  assignment_reward_ids   : attr(),
  assignment_priority_ids : attr(),
  assignment_bid_ids      : attr(),

  description_fragment : Ember.computed('description', function() {
    if(this.get('description') !== undefined) {
      return this.get('description').substr(0, 150) + ' [...]';
    } else {
      return '';
    }
  }),

  is_owner: Ember.computed('user.id', function(){
    var session = this.container.lookup('simple-auth-session:main');
    //console.log('user: ', this.get('user.id'));
    return parseInt(this.get('user.id')) === session.content.id;
  }),

  rewards_select2: Ember.computed(function() {
    var output = [];
    this.get('assignment_rewards').forEach(function(item){
      output.push({id: item.get('id'), text: item.get('reward')});
    });
    return output;
  }),

  skills_select2: Ember.computed(function() {
    var output = [];
    this.get('skills').forEach(function(item){
      output.push({id: item.get('id'), text: item.get('name')});
    });
    return output;
  }),

  initial_skills: Ember.computed('skills', function() {
    var output = [];
    this.get('skills').forEach(function(item){
      output.push(item.get('id'));
    });
    return output;
  }),

  initial_rewards: Ember.computed('assignment_rewards', function() {
    //var self = this;
    //var output = this.reload().then(function(model){
    //  var output = [];
    //  model.get('assignment_rewards').forEach(function(item){
    //    output.push(item.get('id'));
    //  });
    //  return output;
    //});
    //return output.result;
    var output = [];
    this.get('assignment_rewards').forEach(function(item){
      output.push(item.get('id'));
    });
    return output;
  }),

  progressable: Ember.computed(function(){
    var s = this.get('state') + "";
    if (s !== 'draft' || s !== 'closed' || s !== 'completed') {
      return true;
    } else {
      return false;
    }
  })
});

export default Assignment;
