import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { Groups } from './groups.js';

Meteor.methods({
  /**
   * Remove a project
   * @param {String} projectId, the id of the project to remove
   */
  'projects.remove'(projectId) {
    const project = Projects.findOne(projectId);
    Projects.remove(projectId);
  },

  /**
   * Insert a new project
   * @param {Object} data, data to insert for the new project
   */
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
      ungrouped: data.ungrouped,
      csv_name: data.csv_name,
    });
  },

  /**
   * Update a project
   * @param {Object} data, data to update project with
   */
  'projects.update'(project_id, data) {
    Projects.update(project_id, {$set: {
        professor: data.professor,
        name: data.name,
        link: data.link,
        createdAt: new Date(),
        description: data.description,
        deadline: data.deadline,
        min_teammates: data.min_teammates,
        max_teammates: data.max_teammates,
        skills: data.skills,
        ungrouped: data.ungrouped,
        csv_name: data.csv_name,
      }
    });
  },

  /**
   * Adds a student to the ungrouped list of a project
   * @param {String} student_email of student to be added
   * @param {String} project_id of project that student is being added to
   */
  'projects.addStudentToProject'(student_email, project_id) {
    // Check if student is already in the project_id
    const project_count = Projects.find({ $and: [
      {_id: project_id}, {"ungrouped": student_email}]}).count();
    if (project_count == 0) {
      Projects.update({_id: project_id}, {
        $push:{
          "ungrouped": student_email
        }
      });
    }
  },

  /**
   * Removes a student from a project. If the student is in a group and removing
   * that student from the group reduces the group to size 0, the group is also
   * removed.
   * @param {String} project_id of the project that the student is in
   * @param {String} student_email email id of the student to remove
   */
  'projects.removeStudentFromProject'(project_id, student_email) {
    // Check if a student is ungrouped and remove.
    Projects.update({_id:project_id}, {
      $pull:{
        'ungrouped': student_email
      }
    });

    // If not in ungrouped, remove from groups
    Groups.update(
      // Query
      {$and: [
        {"project_id": project_id},
        {"student_emails": student_email}
      ]},
      // Filter
      {$pull: {
        "student_emails": student_email
      }});

    // Remove groups whose size are zero.
    Groups.remove({$and:
      [{"project_id": project_id},
      {"student_emails": {$size: 0}}
    ]});
  },
});

export const Projects = new Mongo.Collection('projects');
