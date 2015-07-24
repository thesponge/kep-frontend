import Ember from 'ember';

export function cutString(length, context, options) {
 if ( context.length > length ) {
  return context.substring(0, length) + "...";
 } else {
  return context;
 }
}

export default Ember.HTMLBars.makeBoundHelper(cutString);
