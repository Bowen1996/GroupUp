import { Meteor } from 'meteor/meteor';
import { Projects } from '../imports/collections/projects.js';

Meteor.startup(() => {
  Meteor.methods({
    'updateUserImage'(userId, image) {
      Meteor.users.update(userId, {$set: {"profile.image": image}});
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
