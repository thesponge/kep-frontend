import Ember from 'ember';
import DS from 'ember-data';
import Resolver from 'ember/resolver';
import loadInitializers from 'ember/load-initializers';
import config from './config/environment';

Ember.MODEL_FACTORY_INJECTIONS = true;

var App = Ember.Application.extend({
  modulePrefix: config.modulePrefix,
  podModulePrefix: config.podModulePrefix,
  Resolver: Resolver
});

loadInitializers(App, config.modulePrefix);

Ember.View.reopen({
  didInsertElement : function(){
    this._super();
    Ember.run.scheduleOnce('afterRender', this, this.afterRenderEvent);
  },
  afterRenderEvent : function(){
    //Foundation.global.namespace = '';
    Ember.$(document).foundation();
    Ember.$('.bid-choose-submit').hide();
  }
});

DS.Store.reopen({
    findOneQuery: function(type, id, query) {
        var store = this;
        var typeClass = store.modelFor(type);
        var adapter = store.adapterFor(typeClass);
        var serializer = store.serializerFor(typeClass);
        var url = adapter.buildURL(type, id);
        var ajaxPromise = adapter.ajax(url, 'GET', { data: query });

        return ajaxPromise.then(function(rawPayload) {
            var extractedPayload = serializer.extract(store, typeClass, rawPayload, id, 'find');
            return store.push(typeClass, extractedPayload);
        });
    }
});

DS.Model.reopen({
  _setupChangeObservers: Ember.on('init', function() {
    return this.eachRelationship((function(_this) {
      return function(name/*, relationship*/) {
        var observer = {
          change: function() {
            return _this._changedRelations.push(name);
          }
        };
        return _this.addObserver(name, observer, 'change');
      };
    })(this));
  }),
  _resetChangedRelations: Ember.on('init', 'didLoad', 'didUpdate', 'rollback', function() {
    return this._changedRelations = [];
  }),
  hasKeyChanged: function(key) {
    return [].pushObjects(this._changedRelations).pushObjects(Ember.keys(this.changedAttributes())).pushObjects(Ember.keys(this._inFlightAttributes)).uniq().contains(key);
  }
});

DS.ActiveModelSerializer.reopen({
  serializeAttribute: function(snapshot, json, key) {
    if (snapshot.record.hasKeyChanged(key)) {
      return this._super.apply(this, arguments);
    }
  },
  serializeHasMany: function(snapshot, json, relationship) {
    var key = relationship.key;
    //console.log('relationship: ', relationship);
    //console.log('key: ', key);
    if (snapshot.record.hasKeyChanged(key)) {
      //alert('Serializer in action!');
      return this._super.apply(this, arguments);
    }
  },
  serializeBelongsTo: function(snapshot, json, relationship) {
    var key = relationship.key;
    //alert('Serializer in action!');
    //console.log('relationship: ', relationship);
    //console.log('key: ', key);
    if (snapshot.record.hasKeyChanged(key)) {
      return this._super.apply(this, arguments);
    }
  }
});

export default App;
