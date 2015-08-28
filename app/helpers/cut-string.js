import Ember from 'ember';

export function cutString(text, length) {
 if ( String(text).length > length.length ) {
   return String(text).substring(0, length.length) + " ...";
 } else {
   return text;
 }
}

export default Ember.HTMLBars.makeBoundHelper(cutString);
