import DS from 'ember-data';

var intention = DS.Model.extend({
  intention : DS.attr('string'),
  resource  : DS.hasMany('resource', {inverse : 'intentions'}),
  account   : DS.hasMany('account',  {inverse : 'intentions'})
});

export default intention;

