import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';
import { createContainer } from 'meteor/react-meteor-data';
import { Groups } from '../../../imports/collections/groups';

import GroupCard from '../student/group_card';

const CARD_ACCEPTED = 2;

/**
* Displays groups that have accepted the student user
*/
class AcceptedCard extends Component {
  /**
  * React render function
  */
  render() {
    if (!this.props.ready) {return <span>loading...</span>}
    return (
        <div className="row">
          <div className="col-md-12 col-center">
            <div className="panel panel-default">
              <div className="panel-heading text-center">
                <h3>Groups that Accepted Me</h3>
              </div>
              <div className="panel-body text-center">
                <div className="row">
                  <div className="col-sm-12 col-center">
                    {this.props.acceptedGroups.map(group =>
                      <GroupCard
                        key={"accepted_group_card_" + group._id}
                        group={group}
                        type={CARD_ACCEPTED}
                        student={this.props.student}
                      />
                    )}
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
  if (Meteor.user() !== undefined) {
    let studentEmail = Meteor.user().emails[0].address;
    let ready = Meteor.subscribe('groups.acceptingStudent', studentEmail, props.projectId).ready();
    let acceptedGroups = Groups.find({$and: [{"accepted": studentEmail}, {"project_id": props.projectId}]}).fetch();
    return {
      ready: ready,
      acceptedGroups: acceptedGroups,
      student: studentEmail,
    }
  } else {
    return {ready: false}
  }
}, AcceptedCard);
