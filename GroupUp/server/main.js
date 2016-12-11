import { Meteor } from 'meteor/meteor';
import { Projects } from '../imports/collections/projects.js';
import { Groups } from '../imports/collections/groups.js';
import { Profiles } from '../imports/collections/profiles.js';

import { getGroupStats } from './GroupStats/GroupStatHelpers.js';
import { createGroupSelector,  createClientsideGroupFilter} from '../imports/collections/groups.js';

Meteor.startup(() => {
  Meteor.methods({
    /**
    * Changes meteor user image
    * @param userId, the user id
    * @param image, the user image
    */
    'updateUserImage'(userId, image) {
      Meteor.users.update(userId, {$set: {"profile.image": image}});
    },

    /**
    * Parses a csv, returning the parsed array
    * @param csvFil, the csv file to parse
    * @return returnArray, the parsed array of objects, turned into a single
    * array of strings
    */
    'parseCSV'(csvFile) {
      var parse = require('csv-parse/lib/sync');

      // Note that parse(csvFile, {columns: true}) would return objects
      const parsedCsv =  parse(csvFile);
      let returnArray = [];

      // Make array of student emails, rather than an array of arrays
      for(email of parsedCsv) {
        returnArray.push(email[0]);
      }
      return returnArray;
    },

    /**
    * Get the group Statistics
    * @return the group statistics
    */
    'getGroupStats'(projectId) {
      return getGroupStats(projectId);
    },
  });
});

/**
 * Gets a certain number of projects that the current professor has created
 * @param {number} limit, the limit of projects to return
 * @return projects
 */
Meteor.publish('projects', function(limit) {
  return Projects.find({"professor": this.userId}, {'limit': limit});
});

/**
 * Returns all projects for the current professor
 * @return projects
 */
Meteor.publish('allProjects', function() {
  return Projects.find({"professor": this.userId});
});

/**
 * Returns a project by id
 * @param {String} projectId, the project id
 * @return specific project
 */
Meteor.publish('projectsById', function(projectId) {
  return Projects.find({"_id": projectId});
});

/**
 * Grabs all requests for a given group.
 * @param {String} student_email, the student email used to get projects
 * @return the projects by student id
 */
Meteor.publish("projectsByStudentId", function(student_email) {
  let project_ids = [];
  const ungrouped_projects = Projects.find({"ungrouped": student_email}).fetch();
  ungrouped_projects.forEach(function(element) {
    project_ids.push(element._id);
  });
  const found_groups = Groups.find({"student_emails": student_email}).fetch();
  found_groups.forEach(function(element) {
    project_ids.push(element.project_id);
  });

  return Projects.find({"_id": {$in: project_ids}});
});

//Groups Publications
/**
 * Grabs all requests for a given group.
 * @param {String} group_id, for group that requests are to be retrieved from
 * @return all students requesting to join a group
 */
Meteor.publish("groups.studentsRequestingToJoinGroup",
  function(group_id) {
  const query = {"_id": group_id};
  const filter = {fields: {"requests": 1}};
  return Groups.find(query, filter);
});

/**
 * Returns a group matching group id
 * @param {String} group_id of desired group
 * @return Group by id
 */
Meteor.publish("groupById", function(group_id) {
  return Groups.find({"_id": group_id});
});

/**
 * Subscription for getting all groups in a project
 * @param {project_id} for project containing groups
 * @return {Cursor} for all groups in project
 */
Meteor.publish("groups.inProject", function(project_id){
  return Groups.find({"project_id":project_id});
});

/**
 * Returns all groups that student belongs to, or group that student has joined
 * if project_id is specificed
 * @param {String} student_email id
 * @param {String} project_id of a project for specific retrieval
 * @return the groups for the given student
 */
Meteor.publish("groups.forStudent", function(student_email, project_id = null) {
  if (!project_id) {
    return Groups.find({"student_emails": student_email});
  }
  const query = {$and: [{"student_emails": student_email},{"project_id": project_id}]}
  return Groups.find(query);
});

Meteor.publish("groups.untouchedGroupsForStudent", function(student_email, project_id) {
  const query = {$and: [{"project_id": project_id},
    {$and: [
      {"requests": {$ne: student_email}},
      {"accepted": {$ne: student_email}},
      {"student_emails": {$ne: student_email}},
    ]}
  ]};
  return Groups.find(query);
});

/**
 * Returns all groups that student requested to join, or groups that student has
 * requested to join in a specific project
 * @param {String} student_email id
 * @param {String} project_id of a project for specific retrieval
 * @return groups student has requested to join
 */
Meteor.publish("groups.studentRequests", function(student_email, project_id) {
  if (!project_id) {
    return Groups.find({"requests": student_email});
  }
  const query = {$and: [{"requests": student_email}, {"project_id": project_id}]};
  return Groups.find(query);
});

/**
 * Returns all groups that have accepted student, or groups that student has
 * requested to join in a specific project
 * @param {String} student_email id
 * @param {String} project_id of a project for specific retrieval
 * @return groups student has requested to join
 */
Meteor.publish("groups.acceptingStudent", function(student_email, project_id) {
  if (!project_id) {
    return Groups.find({"accepted": student_email});
  }
  const query = {$and: [{"accepted": student_email}, {"project_id": project_id}]};
  return Groups.find(query);
});

//Profiles Publications
/**
 * Gets student profile from student email and projectId
 * @param {String} student_email, the student email
 * @param {String} project_id, the projectId
 * @return profile for a student in a given project
 */
Meteor.publish("profiles.studentProfileForProject",
  function(student_email, project_id) {
  const query = {$and: [{"student_email": student_email},
    {"project_id": project_id}]};
  return Profiles.find(query);
});
