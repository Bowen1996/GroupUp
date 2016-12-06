import { Meteor } from 'meteor/meteor';
import { Projects } from './projects.js';

Meteor.methods({
  /**
  * Adds a student as a request for a particular group
  * @param student_email of student wanting to join group
  * @param group_id of group student seeks to join
  */
  "groups.requestJoinGroup"(student_email, group_id) {
    const query = {"_id": group_id};
    const filter = {$push: {"requests": student_email}};
    Groups.update(query, filter);
  },

  /**
   * Moves student from requests list to student_emails list of group and
   * removes student from ungrouped list of project.
   * Fails if student is already in a group or if the group is full.
   * @param {String} student_id of student being accepted
   * @param {String} group_title of group student being added to
   * @param {String} project_id of project containing both groups and students
   * @throws "student-in-team" error if student being accepted to a new team
   * is already in another one
   * @throws "group-at-capacity" error if the group is already at maximum
   * capacity and cannot accept any more teammates
   */
  'groups.acceptRequest'(student_id, group_id, project_id) {
    const checkExistingGroupQuery = {$and: [
      {"project_id": project_id},
      {"student_emails": student_id}
    ]};
    const count = Groups.find(checkExistingGroupQuery).count();
    if (count > 0) {
        throw new Meteor.Error("student-in-team", "Student cannot join " +
        "another team because s/he is already in one.");
    }

    const target_proj = Projects.findOne({_id: projectId});
    const max_capacity = target_proj.max_teammates;
    const target_group = Groups.findOne({"_id": group_id});

    if (target_group.student_emails.length >= max_capacity) {
      throw new Meteor.Error("group-at-capacity",
      "Cannot add student because group is already at maximum number of members"
      );
    }

    const group_selector = {"_id":group_id};
    const group_email_filter = {$push: {"student_emails": student_id}};
    Projects.update(group_selector, group_email_filter);

    Projects.update({_id: project_id}, {
      $pull: {
        "ungrouped": student_id
      }
    });
    return true;
  },

  /**
   * Adds a group to a project if the students in the new group are not already
   * in a group. Removes students from project's ungrouped list before adding
   * the new group.
   * @throws Error code 1 if students making new group are not ALL already
   * ungrouped
   * @param {String} project_id of project to add group
   * @param {title: {String}, student_emails: {List of Strings}} student emails
   * of students being added to the new group
   */
  'groups.addGroup'(project_id, group_data) {
    const studentsInNewGroup = group_data.student_emails;
    const query = {$and: [{"project_id": project_id},
      {"student_emails": {$in: studentsInNewGroup}}]};
    const numInvalidGroups = Groups.find(query).count();
    if (numInvalidGroups > 0) {
      throw new Meteor.Error("student-in-team", "Student(s) is already in "+
      " a team and cannot make a new team.");
    }

    Groups.insert({
      title: group_data.title,
      requests: [],
      student_emails: group_data.student_emails,
      project_id: group_data.project_id,
      description: group_data.description,
      looking_for: group_data.looking_for,
    });

    Projects.update({_id: project_id}, {
      $pull: {
        'ungrouped': {
          $in: studentsInNewGroup
        }
      }
    });
  },

  /**
   * Removes a group from the Groups collection. Adds the removed students to
   * the ungrouped field of the Projects collection
   * @param {String} group_id of group
   */
  'groups.removeGroup'(group_id) {
    const groupToRemove = Groups.findOne({"_id": group_id});
    const project_id = groupToRemove.project_id;
    const removedStudents = groupToRemove.student_emails;
    Projects.update({"_id":project_id}, {$push:{
      "ungrouped": removedStudents
    }});
    Groups.remove({"_id": group_id});
  },

  /**
   * Adds a requesting student to a group.
   * @throws no-request-for-student error if the student has not made a request
   * @param group_id of group the student wants to join
   * @param student_email of student trying to join group
   */
  'groups.AcceptRequestToJoin'(group_id, student_email) {
    // Check if student is in the requests list for the group_id
    const request_query = {$and: [{"_id": group_id},
      {"requests": student_email}]};
    const request_count = Groups.find(request_query).count();
    if (request_count < 1) {
      throw new Meteor.Error("no-request-for-student", "Student has not made" +
      " a request to join the current group for group_id");
    }
    // Remove from requests
    Groups.update({"_id": group_id}, {$pull:{
      "requests": student_email
    }});

    // Add to accepted list
    const query = {"_id": group_id};
    const filter = {$push: {student_emails: student_email}};
    Groups.update(query, filter);
  },

  /**
   * Removes a student from a group. If the group is empty as a result, it also
   * removes the group entirely. Also adds student back to ungrouped list of
   * corresponding project.
   * @param {String} student_email of student to be removed
   * @param {String} group_title of group that the student is being removed from
   * @param {String} project_id of project containing student and group
   */
  'projects.removeStudentFromGroup'(student_email, group_id) {
    const remove_query = {"_id": group_id};
    const remove_filter = {$pull: {"student_emails": student_email}};
    Groups.update(remove_query, remove_filter);

    const target_group = Groups.findOne({"_id":group_id});
    if (target_group.student_emails.length == 0) {
      Groups.remove({"_id": group_id});
    }

    const matching_proj_id = target_group.project_id;
    Projects.update({"_id":matching_proj_id}, {$push:{
      "ungrouped": student_email
    }});
  },

});

export const Groups = new Mongo.Collection('groups');
