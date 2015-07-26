import DS from 'ember-data';

var attr = DS.attr;

var Bid = DS.Model.extend({
  assignment_id  : attr(),
  chosen         : attr(),
  created_at     : attr(),
  user           : DS.belongsTo('user', {inverse: 'assignment_bids', async: true}),
  assignment     : DS.belongsTo('assignment', {inverse : 'assignment_bids', async: true}),
  computed_date : function(){
    return this.get('created_at').substring(0,10);
  }.property('created_at'),
  computed_time : function(){
    return this.get('created_at').substring(11,16);
  }.property('created_at'),
});

export default Bid;
