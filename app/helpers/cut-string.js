import Ember from 'ember';

export function cutString(text, options) {
 if ( String(text).length > options.length ) {
   return String(text).substring(0, options.length) + " ...";
 } else {
   return text;
 }
}

export default Ember.HTMLBars.makeBoundHelper(cutString);
