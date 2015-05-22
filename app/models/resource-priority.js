import DS from 'ember-data';

var resourcePriority = DS.Model.extend({
  resource:      DS.belongsTo('resource', {inverse: 'resource_types'})
});

export default resourcePriority;

