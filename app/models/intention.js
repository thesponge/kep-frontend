import DS from 'ember-data';

var attr = DS.attr;

var intention = DS.Model.extend({
  intention : attr('string'),
  resource  : DS.hasMany('resource', {inverse : 'intentions'}),
  account   : DS.hasMany('account',  {inverse : 'intentions'})
});

export default intention;

