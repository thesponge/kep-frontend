import DS from 'ember-data';

var attr = DS.attr;

var Resource = DS.Model.extend({
  submissionType : 'resource',
  title          : attr('string'),
  description    : attr('string'),
  user           : DS.belongsTo('user', {inverse: 'resources', async: true}),
  intentions     : DS.hasMany('intention', {async : true, embedded : 'always'}),
  intention_ids  : attr(),
  resource_priority_ids  : attr(),
  description_fragment: function() {
    if(this.get('description') !== undefined) {
      return this.get('description').substr(0, 150) + ' [...]';
    } else {
      return '';
    }
  }.property('description'),
  is_owner: function(){
    var session = this.container.lookup('simple-auth-session:main');
    return parseInt(this.get('user.id')) === session.content.id;
  }.property(),
  intentions_select2: function() {
    var output = [];
    this.get('intentions').forEach(function(item){
      output.push({id: item.get('id'), text: item.get('intention')});
    });
    return output;
  }.property(),
});

//Resource.reopenClass({
  //FIXTURES: [
    //{id: 1, title: 'Resource One'},
    //{id: 2, title: 'Resource Two'},
    //{id: 3, title: 'Resource Three'}
  //]
//});

export default Resource;
