import Ember from 'ember';
import LoginControllerMixin from 'simple-auth/mixins/login-controller-mixin';

Ember.LinkView.reopen({
  attributeBindings: ['data-reveal-id']
});

export default Ember.Controller.extend(LoginControllerMixin, {
    authenticator: 'simple-auth-authenticator:devise',
    actions: {
      testNotifications: function(){
        this.notifications.addNotification({
            message: 'Notification test, no autoClear.',
            type: 'success',
            autoClear: false
        });
        this.notifications.addNotification({
            message: 'Notification test with autoClear.',
            type: 'error',
            autoClear: true
        });
      },
      authenticate: function() {
        var self = this;
        this._super().then(function() {
          self.notifications.addNotification({
              message: 'Logged in!',
              type: 'success',
              autoClear: true
          });
        },function(){
          self.notifications.addNotification({
              message: 'Cannot log in!',
              type: 'error',
              autoClear: true
          });
        }
        );
      }
    },
}
);
