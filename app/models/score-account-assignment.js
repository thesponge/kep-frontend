import DS from 'ember-data';

var Score = DS.Model.extend({
  account_id       : DS.attr(),
  assignment_id    : DS.attr(),
  total_score      : DS.attr(),
  score_categories : DS.attr('string'),
  created_at       : DS.attr(),
  updated_at       : DS.attr(),
  assignment       : DS.belongsTo('assignment',  {inverse : 'assignment_matches'}),
  //score-account-assignment : DS.belongsTo('score-account-assignment', {polymorphic: true}),
});

export default Score;
