import DS from 'ember-data';

var attr = DS.attr;

var Assignment = DS.Model.extend({
  submissionType          : 'assignment',
  title                   : attr('string'),
  description             : attr('string'),
  state                   : attr('string'),
  user                    : DS.belongsTo('user', {inverse: 'assignments', async: true}),
  skills                  : DS.hasMany('skill',              {inverse : 'assignment', async : true, embedded : 'always'}),
  assignment_rewards      : DS.hasMany('assignmentReward',   {inverse : 'assignment', async : true, embedded : 'always'}),
  assignment_bids         : DS.hasMany('assignmentBid',      {inverse : 'assignment', async : true, embedded : 'always'}),
  assignment_priorities   : DS.hasMany('assignmentPriority', {inverse : 'assignment', async : true, embedded : 'always'}),
  languages               : DS.hasMany('language', {inverse : 'assignment', async : true, embedded : 'always'}),
  locations               : DS.hasMany('location', {inverse : 'assignment', async : true, embedded : 'always'}),
  skill_ids               : attr(),
  assignment_reward_ids   : attr(),
  assignment_priority_ids : attr(),
  assignment_bid_ids      : attr(),

  description_fragment : function() {
    if(this.get('description') !== undefined) {
      return this.get('description').substr(0, 150) + ' [...]';
    } else {
      return '';
    }
  }.property('description'),

  is_owner: function(){
    var session = this.container.lookup('simple-auth-session:main');
    //console.log('user: ', this.get('user.id'));
    return parseInt(this.get('user.id')) === session.content.id;
  }.property('user.id'),

  rewards_select2: function() {
    var output = [];
    this.get('assignment_rewards').forEach(function(item){
      output.push({id: item.get('id'), text: item.get('reward')});
    });
    return output;
  }.property(),

  skills_select2: function() {
    var output = [];
    this.get('skills').forEach(function(item){
      output.push({id: item.get('id'), text: item.get('name')});
    });
    return output;
  }.property(),

  initial_skills: function() {
    var output = [];
    this.get('skills').forEach(function(item){
      output.push(item.get('id'));
    });
    return output;
  }.property('skills'),

  initial_rewards: function() {
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
  }.property('assignment_rewards'),

  progressable: function(){
    var s = this.get('state') + "";
    if (s !== 'draft' || s !== 'closed' || s !== 'completed') {
      return true;
    } else {
      return false;
    }
  }.property()
});

export default Assignment;
