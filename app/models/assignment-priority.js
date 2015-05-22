import DS from 'ember-data';

var assignmentPriority = DS.Model.extend({
  assignment:      DS.belongsTo('assignment', {inverse: 'assignment_types'})
});

export default assignmentPriority;

