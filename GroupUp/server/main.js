import { Meteor } from 'meteor/meteor';
import { Projects } from '../imports/collections/projects.js';

Meteor.startup(() => {
  Meteor.publish('projects', function(limit) {
    return Projects.find({"professor": this.userId}, {'limit': limit});
  });

  Meteor.methods({
    'projects.remove'(projectId) {
      const project = Projects.findOne(projectId);
      Projects.remove(projectId);
    },

    'projects.insert'(data) {
      Projects.insert({
        "professor": data.professor,
        "name": data.name,
        "createdAt": new Date(),
        "description": data.description,
        "deadline": data.deadline,
        "min_teammates": data.min_teammates,
        "max_teammates": data.max_teammates,
        "skills": data.skills,
        "student_emails": data.emails,
      });
    },

    'convertImage'(buffer) {
      var btoa = require('btoa');
      var binstr = Array.prototype.map.call(buffer, function (ch) {
          return String.fromCharCode(ch);
      }).join('');
      return btoa(binstr);
    }
  });
});
