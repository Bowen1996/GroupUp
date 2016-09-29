import { Meteor } from 'meteor/meteor';
import { Projects } from '../imports/collections/projects.js';

Meteor.startup(() => {
  Meteor.methods({
    'convertImage'(buffer) {
      var btoa = require('btoa');
      var binstr = Array.prototype.map.call(buffer, function (ch) {
          return String.fromCharCode(ch);
      }).join('');
      return btoa(binstr);
    },

    'parseCSV'(csvFile) {
      var parse = require('csv-parse/lib/sync');
      return parse(csvFile);
    },
  });

  Meteor.publish('projects', function(limit) {
    return Projects.find({"professor": this.userId}, {'limit': limit});
  });
});
