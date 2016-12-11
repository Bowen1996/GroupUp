import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Link, browserHistory } from 'react-router';
import { Profiles } from '../../../imports/collections/profiles';

import Button from '../utility/button';
import ButtonSuccess from '../utility/button_success';
import ButtonDanger from '../utility/button_danger';

/**
* A card displaying a student's email, image, and a link to their profile page.
*/
export default class ProfileCard extends Component {
  /**
  * Accept student into your group
  */
  acceptStudent() {
    console.log(this.props.student);
    console.log(this.props.groupId);
    console.log(this.props.projectId);
    Meteor.call('groups.acceptRequest', this.props.student, this.props.groupId, this.props.projectId);
    browserHistory.push('/my-group/' + this.props.projectId);
  }

  /**
  * React render function
  */
  render() {
    let acceptStudentButton = null;
    if (this.props.displayAccepted === "true") {
      acceptStudentButton = (
        <ButtonDanger onClick='' text="Needs to Confirm" />
      );
    } else if (this.props.displayAccept === "true") {
      acceptStudentButton = (
        <ButtonSuccess onClick={this.acceptStudent.bind(this)} text="Accept" />
      );
    }
    return (
      <div className="col-sm-3">
        <div className="panel panel-default">
          <div className="panel-body">
            <p className="text-center">{this.props.student}</p>
            <img className="profile-image" src={this.props.imageLink} />
            <Link to={"/student-profile/" + this.props.projectId + "/" + this.props.student} className="no-link-style">
              <Button onClick='' text="Profile" />
            </Link>
            {acceptStudentButton}
          </div>
        </div>
      </div>
    )
  }
}
