import DS from 'ember-data';

var attr = DS.attr;

var Bid = DS.Model.extend({
  assignment_id  : attr(),
  user_id        : attr(),
  //user           : DS.belongsTo('user'),
  //assignment     : DS.belongsTo('assignment', {inverse : 'assignment_bids', async : true, embedded : 'always'}),
});

export default Bid;
