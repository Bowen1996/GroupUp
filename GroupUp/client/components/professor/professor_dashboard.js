import React, {Component} from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Link, browserHistory } from 'react-router';
import GeneralDashboard from '../utility/general_dashboard';
import { Projects } from '../../../imports/collections/projects';

/**
* Main professor dashboard with each of the projects that the professor has created
*/
class ProfessorDashboard extends Component {
  /**
  * React render function
  */
  render() {
    return (
      <GeneralDashboard
        title="Professor Dashboard"
        description="Welcome! GroupUp is a tool for students to create groups for class projects.
        Click below to create a class project, set a group formation deadline, and import students."
        isProfessor={true}
        projects={this.props.projects}
        link="/project-dashboard/"
        buttonText="Project Settings"
        />
    );
  }
}

export default createContainer(() => {
  Meteor.subscribe('projects', 5);
  return { projects: Projects.find({}).fetch() };
}, ProfessorDashboard);
