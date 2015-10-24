import Ember from 'ember';

export default Ember.Controller.extend({
  //assignment: function() {
  //  return this.store.find('assignment', 66);
  //}.property(),
  languages_select: Ember.computed(function() {
    var output = [];
    this.store.findAll('language').then(function(records){
      records.forEach(function(item){
        output.push({id: item.get('id'), text: item.get('common')});
      });
    });
    return output;
  }),
  rewards_select: Ember.computed(function() {
    var output = [];
    this.store.findAll('assignment-reward').then(function(records){
      records.forEach(function(item){
        output.push({id: item.get('id'), text: item.get('reward')});
      });
    });
    return output;
  }),
  skills_select: Ember.computed(function() {
    var output = [];
    this.store.findAll('skill').then(function(records){
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
  }),
  actions: {
    updateAssignment: function() {
      var compare = function(first, second) {
        if (first.length !== second.length) {
          return false;
        }
        for (var i = 0; i < second.length; i++) {
            if (first[i].compare) {
                if (!first[i].compare(second[i])) {
                  return false;
                }
            }
            if (first[i] !== second[i]) {
              return false;
            }
        }
        return true;
      };

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

      var selected_languages = this.get('assignment.languages_select2');
      var selected_languages_output = [];
      selected_languages.forEach(function(item){
        selected_languages_output.push(item.id);
      });

      console.log('compare skills: ', compare(selected_skills_output, this.get('assignment.initial_skills')));
      console.log('compare rewards: ', compare(selected_rewards_output, this.get('assignment.initial_rewards')));
      console.log('this', this.get('assignment.initial_rewards'));

      console.log("Title: ", this.get('assignment.title'));
      this.set('assignment.title', this.get('assignment.title'));
      console.log("Description: ", this.get('assignment.description'));
      this.set('assignment.description', this.get('assignment.description'));

      console.log("selected_skills_output: ", selected_skills_output);
      if(compare(selected_skills_output, this.get('assignment.initial_skills')) === false) {
        this.set('assignment.skill_ids', selected_skills_output);
      }
      console.log("selected_rewards_output: ", selected_rewards_output);
      if(compare(selected_rewards_output, this.get('assignment.initial_rewards')) === false) {
        this.set('assignment.assignment_reward_ids', selected_rewards_output);
      }
      console.log("selected_languages_output: ", selected_languages_output);
      if(compare(selected_languages_output, this.get('assignment.initial_languages')) === false) {
        this.set('assignment.language_ids', selected_languages_output);
      }
      console.log("selected_locations_output: ", this.get('assignment.location'));
      if(compare(this.get('assignment.location'), this.get('assignment.initial_locations')) === false) {
        this.set('assignment.location_ids', this.get('assignment.location'));
      }

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
