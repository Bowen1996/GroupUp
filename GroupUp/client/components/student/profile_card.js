import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Link, browserHistory } from 'react-router';
import { Profiles } from '../../../imports/collections/profiles';

/**
* A card displaying a student's email, image, and a link to their profile page.
*/
export default class ProfileCard extends Component {
  /**
  * Render buttons for profile card
  */
  renderButtons() {
    if (this.props.displayAccept === "true") {
      return(
        <div>
          <button
            className="btn btn-raised btn-default btn-block">
            Profile
          </button>
          <button
            className="btn btn-raised btn-success btn-block">
            Accept
          </button>
        </div>
      )
    } else {
      return(
        <button
          className="btn btn-raised btn-default btn-block">
          Profile
        </button>
      )
    }
  }

  /**
  * React render function
  */
  render() {
    if (!this.props.ready) {return <span>loading...</span>}
    return (
      <div className="col-sm-3">
        <Link to={this.props.link} className="no-link-style">
        <div className="panel panel-default">
          <div className="panel-body">
            <h3 className="text-center">{this.props.profile.student_email}</h3>
            <img className="profile-image" src={this.props.imageLink} />
            {this.renderButtons()}
          </div>
        </div>
        </Link>
      </div>
    )
  }
}

export default createContainer((props) => {
  let profileReady = Meteor.subscribe('profiles.studentProfileForProject',  props.email, props.projectId).ready();
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
}, ProfileCard);
