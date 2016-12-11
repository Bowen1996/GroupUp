import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';
import { createContainer } from 'meteor/react-meteor-data';
import { Profiles } from '../../../imports/collections/profiles';

import Back from '../utility/back';
import Button from '../utility/button';
import SchedulePicker from '../student/about_me/schedule_picker';

class StudentProfile extends Component {
  /**
  * React render function
  */
  render() {
    if (!this.props.ready) {return <span>loading...</span>}
    return (
      <div className="container">
        <Back />
        <div className="row">
          <div className="col-md-12 col-center">
            <div className="panel panel-default">
              <div className="panel-heading text-center">
                <h3>Student Profile</h3>
              </div>
              <div className="panel-body text-center">
                <div className="row">
                  <div className="col-sm-6">
                    <div className="bottom-buffer">
                      <h3 className="text-center">Email: {this.props.profile.student_email}</h3>
                      <img className="profile-image" src="https://x1.xingassets.com/assets/frontend_minified/img/users/nobody_m.original.jpg" />
                    </div>
                    <div className="col-sm col-center">
                      <h4 className="dark-grey">Bio:</h4>
                      <div className="well">
                        <h4>{this.props.profile.bio}</h4>
                      </div>
                      <h4 className="dark-grey">Relevant Skills for the Project:</h4>
                      <div className="well">
                        {this.props.profile.skills.map(skill =>
                          <h4 key={this.props.profile.student_email + "_" + skill.name}>Skill: {skill.name} - Proficiency: {skill.proficiency} (out of 5)</h4>
                        )}
                      </div>
                      <h4 className="dark-grey">Other Relevant Experience:</h4>
                      <div className="well">
                        <h4>{this.props.profile.experience}</h4>
                      </div>
                      <h4 className="dark-grey">I want to be in a group with people who...</h4>
                      <div className="well">
                        <h4>{this.props.profile.want}</h4>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-6 center-block">
                    <SchedulePicker className="vertical-center row-center" scheduleArray={this.props.profile.schedule} readOnly={true}/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default createContainer((props) => {
  let profileReady = Meteor.subscribe('profiles.studentProfileForProject', props.params.student, props.params.projectId).ready();
  let profile = Profiles.find({}).fetch();
  if (profile.length > 0) {
    profile = profile[0];
  } else {
    profile = undefined;
  }
  return {
    ready : profileReady,
    profile: profile,
  }
}, StudentProfile);
