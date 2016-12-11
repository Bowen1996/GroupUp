import React, {Component} from 'react';
import { Link, browserHistory } from 'react-router';
import { createContainer } from 'meteor/react-meteor-data';
import { Projects } from '../../../../imports/collections/projects';
import { Profiles } from '../../../../imports/collections/profiles';

import PageTitle from '../../utility/page_title';
import Back from '../../utility/back';
import SchedulePicker from './schedule_picker';
import SkillSelector from './skill_selector';
import Button from '../../utility/button';
import ButtonDanger from '../../utility/button_danger';

/**
* Form for students to enter project about me profile information
*/
class AboutMeForm extends Component {
  /**
  * Submits the About Me form, updating the database
  * @param e, the event to submit the content
  */
  submit(e) {
    e.preventDefault();
    const aboutMe = {
      project_id: this.props.params.projectId,
      student_email: Meteor.user().emails[0].address,
      schedule: this.refs.schedulePicker.getScheduleArray(),
      bio: this.refs.bio.value,
      skills: this.getSkills(),
      experience: this.refs.experience.value,
      want: this.refs.want.value,
    };
    Meteor.call('profiles.insert', aboutMe);

    // Navigate to the "my group" page
    browserHistory.push('/my-group/' + this.props.params.projectId);
  }

  /**
  * Returns the skills from the project that the professor has specified
  * @return skills, the project skills
  */
  getSkills() {
    let skills = [];
    for (let i = 0; i < this.props.project.skills.length; i++) {
      const currentSkill = this.refs["skill" + i];
      const currentSkillName = this.props.project.skills[i].text;
      if (currentSkill.getSkill() !== null) {
        skills.push({index: i, name: currentSkillName, proficiency: currentSkill.getSkill()});
      }
    }
    return skills;
  }

  /**
  * React render function
  */
  render() {
    if (!this.props.ready || !this.props.profileReady) {return <span>loading...</span>}
    return (
      <div className="container">
        <Back link="/student-dashboard/" />
        <PageTitle title={"You are about to group up with other students in " +  this.props.project.name + "! First, tell the students you will be grouping up with a little bit more about yourself."} />
        <div className="row">
          <div className="col-sm-12">
            <div className="panel panel-default">
              <div className="panel-heading">
                <h3>About Me</h3>
              </div>
              <div className="panel-body">
                <form className="col-sm-8 col-center">
                  <div className="form-group">
                    <label>Schedule Picker:</label>
                    <p>Click All Possible Weekly Meeting Times (select as many times as possible)</p>
                    <SchedulePicker ref="schedulePicker" readOnly={false}/>
                  </div>
                  <div className="form-group">
                    <label>My short bio:</label>
                    <textarea className="form-control" ref="bio" rows="3" />
                  </div>
                  <div className="form-group">
                    <label>Select your skills:</label>
                    <p>Check all that apply and click a radio button to select your level of proficiency, where</p>
                    <p>1 = very little knowledge, 2 = beginner, 3 = novice, 4 = advanced, 5 = expert</p>
                    {this.props.project.skills.map((skill, index) => {
                        return <SkillSelector ref={"skill" + index} key={"skill_" + index} text={skill.text} />
                      }
                    )}
                  </div>
                  <div className="form-group">
                    <label>Other relevant skills / experience:</label>
                    <textarea className="form-control" ref="experience" rows="3" />
                  </div>
                  <div className="form-group">
                    <label>I want to be in a group with people who...</label>
                    <textarea className="form-control" ref="want" rows="3" />
                  </div>
                  <div className="form-group">
                    <hr />
                    <div className="row">
                      <div className="col-sm-6">
                        <Link to="/professor-dashboard">
                          <ButtonDanger onClick="" text="CANCEL" />
                        </Link>
                      </div>
                      <div className="col-sm-6">
                        <Button onClick={this.submit.bind(this)} text="SUBMIT" />
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default createContainer((props) => {
  if (Meteor.user() !== undefined) {
    let profileReady = Meteor.subscribe('profiles.studentProfileForProject',  Meteor.user().emails[0].address, props.params.projectId).ready();
    let profile = Profiles.find({}).fetch();

    // Redirect if about me profile already exists
    if (profile.length > 0) {
      browserHistory.push('/my-group/' + props.params.projectId);
    }
    return {
      ready: Meteor.subscribe('projectsById', props.params.projectId).ready(),
      project: Projects.findOne(props.params.projectId),
      profileReady: profileReady,
      profile: profile,
    }
  } else {
    return {ready: false}
  }
}, AboutMeForm);
