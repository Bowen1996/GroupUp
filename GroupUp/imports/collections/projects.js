import { Mongo } from 'meteor/mongo';

Meteor.methods({
  'projects.remove'(projectId) {
    const project = Projects.findOne(projectId);
    Projects.remove(projectId);
  },

  'projects.insert'(data) {
    Projects.insert({
      professor: data.professor,
      name: data.name,
      createdAt: new Date(),
      description: data.description,
      deadline: data.deadline,
      min_teammates: data.min_teammates,
      max_teammates: data.max_teammates,
      skills: data.skills,
      student_emails: data.student_emails,
    });
  },
});

export const Projects = new Mongo.Collection('projects');
