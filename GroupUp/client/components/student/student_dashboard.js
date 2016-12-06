import React, {Component} from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Link, browserHistory } from 'react-router';
import { Projects } from '../../../imports/collections/projects';

import GeneralDashboard from '../utility/general_dashboard';

/**
* Presents the student dashboard, which contains the projects the student has joined.
*/
class StudentDashboard extends Component {
  /**
  * React render function
  */
  render() {
    if (!this.props.ready) {return <span>loading...</span>}
    return(
      <GeneralDashboard
        title="Student Dashboard"
        description="Welcome! Click on one of your projects below to start grouping up.
        If you don't see your project below, visit the link that your professor gave you and sign in again."
        isProfessor={false}
        projects={this.props.projects}
        link={"/about-me/"}
        buttonText="Start Grouping Up!"
        />
    );
  }
}

export default createContainer(() => {
  if (Meteor.user() !== undefined) {
    return {
      ready: Meteor.subscribe('projectsByStudentId', Meteor.user().emails[0].address).ready(),
      projects: Projects.find({}).fetch()
    }
  } else {
    return {ready: false}
  }
}, StudentDashboard);
