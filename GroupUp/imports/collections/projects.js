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
      link: data.link,
      createdAt: new Date(),
      description: data.description,
      deadline: data.deadline,
      min_teammates: data.min_teammates,
      max_teammates: data.max_teammates,
      skills: data.skills,
      ungrouped: data.student_emails,
      groups: [],
    });
  },
});

export const Projects = new Mongo.Collection('projects');
