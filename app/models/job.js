import DS from 'ember-data';

var attr = DS.attr;

var Job = DS.Model.extend({
  title:                 attr('string'),
  description:           attr('string', { defaultValue: 'Default description' }),
  travel:                attr('string'),
  tech:                  attr('string'),
  driver_license:        attr('string')
  //job_type_ids:          attr('string'),
  //job_compensation_ids:  attr('string'),
  //job_priority_ids:      attr('string')
});

//Job.reopenClass({
//  FIXTURES: [
//    {id: 1, title: 'Job One'},
//    {id: 2, title: 'Job Two'},
//    {id: 3, title: 'Job Three'}
//  ]
//});

export default Job;
