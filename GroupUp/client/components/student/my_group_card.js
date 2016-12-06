import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';
import { Groups } from '../../../imports/collections/groups';

import ProfileCard from '../student/profile_card';
import ButtonDanger from '../utility/button_danger';

/**
* A card displaying the group the current logged-in student is in. Display's the
* group's title, description, "looking for..", and other group members. Also
* gives the student an option to leave the group.
*/
export default class MyGroupCard extends Component {
  /**
  * Calls meteor method to leave the student group
  */
  leaveGroup() {
    Meteor.call('projects.removeStudentFromGroup', Meteor.user().emails[0].address, this.props.group._id);
  }

  /**
  * React render function
  */
  render() {
    return (
        <div className="row bottom-buffer">
          <div className="col-md-12 col-center">
            <div className="panel panel-default">
              <div className="panel-heading text-center">
                <h3>{this.props.group.title}</h3>
              </div>
              <div className="panel-body text-center">
                <div className="row">
                  <div className="col-sm-11 col-center">
                    <h4 className="dark-grey">Description</h4>
                    <div className="well">
                      <h4>{this.props.group.description}</h4>
                    </div>
                    <h4 className="dark-grey">Looking for members that...</h4>
                    <div className="well">
                      <h4>{this.props.group.looking_for}</h4>
                    </div>
                    <div className="row">
                      <div className="col-sm-12 col-center">
                        <ProfileCard
                          link=""
                          name="Amanda"
                          imageLink="https://x1.xingassets.com/assets/frontend_minified/img/users/nobody_m.original.jpg"
                          buttonText="Profile"
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-4 col-center">
                        <ButtonDanger onClick={this.leaveGroup.bind(this)} text="Leave this group" />
                      </div>
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
