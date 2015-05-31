import Ember from 'ember';

export default Ember.Controller.extend({
  //assignment: function() {
  //  return this.store.find('assignment', 66);
  //}.property(),
  rewards_select: function() {
    var output = [];
    this.store.find('assignment-reward').then(function(records){
      records.forEach(function(item){
        output.push({id: item.get('id'), text: item.get('reward')});
      });
    });
    return output;
  }.property(),
  skills_select: function() {
    var output = [];
    this.store.fetchAll('skill').then(function(records){
      records.forEach(function(item){

        var filter = output.filter(function(obj) {
              return obj.text === item.get('category');
            });

        if (filter.length === 0) {
          output.push({ 
            text: item.get('category'),
            children:[
              {
                id: item.get('id'),
                text: item.get('name')
              }
            ]
          });
        } else {
          var index = output.indexOf(filter[0]);
          output[index].children.push(
            {
              id: item.get('id'),
              text: item.get('name')
            }
          );
        }
      });
    });

    return output;
  }.property(),
  actions: {
    updateAssignment: function() {
      var compare = function(first, second) {
        if (first.length != second.length) return false;
        for (var i = 0; i < second.length; i++) {
            if (first[i].compare) {
                if (!first[i].compare(second[i])) return false;
            }
            if (first[i] !== second[i]) return false;
        }
        return true;
      }

      var selected_skills = this.get('assignment.skills_select2');
      var selected_skills_output = [];
      selected_skills.forEach(function(item){
        selected_skills_output.push(item.id);
      });

      var selected_rewards = this.get('assignment.rewards_select2');
      var selected_rewards_output = [];
      selected_rewards.forEach(function(item){
        selected_rewards_output.push(item.id);
      });

      console.log('compare skills: ', compare(selected_skills_output, this.get('assignment.initial_skills')));
      console.log('compare rewards: ', compare(selected_rewards_output, this.get('assignment.initial_rewards')));
      console.log('this', this.get('assignment.initial_rewards'));

      console.log("Title: ", this.get('assignment.title'));
      this.set('assignment.title', this.get('assignment.title'));
      console.log("Description: ", this.get('assignment.description'));
      this.set('assignment.description', this.get('assignment.description'));

      if(compare(selected_skills_output, this.get('assignment.initial_skills')) == false) {
        this.set('assignment.skill_ids', selected_skills_output);
      }
      if(compare(selected_rewards_output, this.get('assignment.initial_rewards')) == false) {
        this.set('assignment.assignment_reward_ids', selected_rewards_output);
      }

      //console.log("Travel: ", this.get('assignment.travel'));
      //this.set('assignment.travel');
      //console.log("Driving license: ", this.get('assignment.driver_license'));
      //this.set('assignment.driver_license');

      var self = this;
      self.get('assignment').save().then(function() {
        console.log('Saved!');
        self.notifications.addNotification({
            message: 'Assignment #' + self.get('assignment').id + ' updated!',
            type: 'success',
            autoClear: true
        });
        self.transitionToRoute('assignments.show', self.get('assignment'));
      },
      function(response) {
        console.error('There was a problem', response);
        Object.keys(response.errors).map(function(value, index) {
          console.log('Response value, index: ', value, index);
          response.errors[value].map(function(v, i){
            self.notifications.addNotification({
              message: i + '. ' + value + ' ' + v,
              type: 'error',
              autoClear: true,
              clearDuration: 2500
            });
          });
        });
      }
     );
    },
    cancel: function(){
      this.get('assignment').rollback();
      this.transitionToRoute('assignments.show', this.get('assignment'));
    }
  }
});
