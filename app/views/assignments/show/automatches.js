import Ember from 'ember';

export default Ember.View.extend({
  didInsertElement: function() {
    this._super();
    //alert('blaaa');
    Ember.run.scheduleOnce('afterRender', this, function(){
      var self = this;
      this.$('#myModal').foundation('reveal', 'open');
      //this.$('.choice-from-dropdown>a').mouseup(function(evt) {
      //  //alert('click!');
      //  //evt.stopImmediatePropagation();
      //  //evt.preventDefault();
      //  //self.$('#drop1-btn').trigger('click');
      //  //Foundation.libs.dropdown.open(Ember.$('#drop1-btn'));
      //  //self.$('#drop1-btn').trigger('click.fndtn.dropdown')
      //  //self.$('#drop1').addClass('open f-open-dropdown')
      //  //self.$('div.content').css('outline', '1px solid orange');
      //});
      this.$(document).on('close.fndtn.reveal', '[data-reveal]', function () {
        self.get('controller.target.router').transitionTo('assignments.show', self.get('controller.model'));
      });
    })
  }
});
