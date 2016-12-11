import { Projects } from '../../imports/collections/projects.js';
import { Groups } from '../../imports/collections/groups.js';

/**
 * Retrieves all groups in specified project
 * @param  {String} project_id mongo object id of project
 * @return {List of Group objects}
 */
function getAllGroupsInProject(project_id) {
  return Groups.find({"project_id": project_id}).fetch();
}

/**
 * Creates a list of all grouped students from a groups object
 * @param  {Array of group objects} groups contains students in student_emails
 * @return {Array of strings} list of student_emails
 */
function extractStudentsFromGroups(groups) {
  let students = [];
  groups.forEach(function(group) {
    students = students.concat(group.student_emails);
  });
  return students;
}

/**
 * Determines total number of students both grouped and ungrouped
 * @param  {Array of Strings} ungrouped_students all ungrouped student in project
 * @param  {Array of Strings} grouped_students   all grouped students in project
 * @return {number} count of all students in project
 */
function getNumStudents(ungrouped_students, grouped_students) {
  return (ungrouped_students.length + grouped_students.length);
}

/**
 * Returns an array of strings containing all students from given grouped and
 * ungrouped arrays
 * @param {Array of Strings}ungrouped_students, ungrouped students
 * @param {Array of Strings} grouped_students, grouped students
 */
function getAllStudents(ungrouped_students, grouped_students) {
  return ungrouped_students.concat(grouped_students);
}

/**
 * Classifies groups based on amount of students in groups relative to projects
 * specified min and max limits. Too small is an array of groups too small for
 * the given project. Too big is an array of groups exceeding max limit of proj.
 * Valid_filled is an array of groups meeting max_limit. Valid_unfilled is
 * an array of groups over min_limit but below max_limit.
 * @param {number} min_limit, the minimum limit for the group
 * @param {number} max_limit, the maxiumum limit for the group
 * @param {Array of Objects} groups, the current groups
 */
function classifyGroups(min_limit, max_limit, groups) {
  let too_small = [];
  let too_big = [];
  let valid_filled = [];
  let valid_unfilled = [];
  let student_emails = 0;

  groups.forEach(function(group) {
    students = group.student_emails
    size = students.length;
    if (size < min_limit) {
      too_small.push(group);
    } else if (size > max_limit) {
      too_big.push(group);
    } else if (size == max_limit) {
      valid_filled.push(group);
    } else {
      valid_unfilled.push(group);
    }
  });

  return {
    "too_small": too_small,
    "too_big": too_big,
    "valid_filled": valid_filled,
    "valid_unfilled": valid_unfilled
  };
}

/**
 * Retrieves total number of students, number of ungrouped students, number of
 * grouped students, an array of all students in a project. Also returns an
 * object containing classifications of groups based on number of students in
 * group compared to minimum and maximum team sizes specified for the project.
 * @param {String} project_id, the project id
 */
function getGroupStats(project_id) {
  const project = Projects.findOne({"_id":project_id});
  const ungrouped_students = project.ungrouped;
  const min_limit = project.min_teammates;
  const max_limit = project.max_teammates;
  const groups = getAllGroupsInProject(project_id);
  const grouped_students = extractStudentsFromGroups(groups);
  const num_students = getNumStudents(ungrouped_students, grouped_students);
  const all_students = getAllStudents(ungrouped_students, grouped_students);
  const classified_groups = classifyGroups(min_limit, max_limit, groups);

/*
  console.log({
    "num_students": num_students,
    "num_ungrouped": ungrouped_students.length,
    "num_grouped": grouped_students.length,
    "classified_groups": classified_groups,
    "all_students": all_students
  });
  */

  return {
    "num_students": num_students,
    "num_ungrouped": ungrouped_students.length,
    "num_grouped": grouped_students.length,
    "classified_groups": classified_groups,
    "all_students": all_students
  };
}

export { getGroupStats };
