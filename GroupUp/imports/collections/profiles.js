Meteor.methods({
  /**
   * Removes a profile
   * @param {String} profile_id, the id of the profile to remove
   */
  'profiles.remove'(profile_id) {
    Profiles.remove(profile_id);
  },

  /**
   * Inserts a new profile
   * @param {Object} profile_data, the data to insert into the profile
   */
  'profiles.insert'(profile_data) {
    Profiles.insert({
      student_email: profile_data.student_email,
      project_id: profile_data.project_id,
      schedule: profile_data.schedule,
      bio: profile_data.bio,
      skills: profile_data.skills,
      experience: profile_data.experience,
      want: profile_data.want,
    });
  },

  /**
   * Updates the profile
   * @param {String} profile_id, the id of the profile to update
   * @param {Object} data, the profile data used to update the profile
   */
  'profiles.update'(profile_id, data) {
  }
});

export const Profiles = new Mongo.Collection('profiles');
