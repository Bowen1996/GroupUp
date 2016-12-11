import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';
import { createContainer } from 'meteor/react-meteor-data';
import { Groups } from '../../../imports/collections/groups';

import Back from '../utility/back';
import GroupCard from '../student/group_card';

const CARD_GROUP = 0;
const CARD_REQUESTED = 1;
const CARD_ACCEPTED = 2;
const CARD_UNTOUCHED = 3;

/**
* Presents a page of all the current groups in a project.
*/
class CurrentGroups extends Component {
  /**
  * React render function
  */
  render() {
    if (!this.props.ready || !this.props.groupReady
      || !this.props.untouchedReady || !this.props.requestedReady
      || !this.props.acceptedReady) {return <span>loading...</span>}

    let groupMessage;
    if ((this.props.group.length
        + this.props.untouched.length
        + this.props.requested.length
        + this.props.accepted.length) > 0) {
      groupMessage = "Groups that other students have proposed are listed below"
    } else {
      groupMessage = "No groups yet"
    }
    return (
      <div className="container">
        <Back link={"/my-group/" + this.props.params.projectId} />
        <div className="row bottom-buffer">
          <div className="col-md-12 col-center">
            <div className="panel panel-default">
              <div className="panel-heading text-center">
                <h3>Current Groups</h3>
              </div>
              <div className="panel-body text-center">
                <h4>
                  {groupMessage}
                </h4>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          {this.props.group.map(group =>
            <GroupCard
              key={group._id}
              type={CARD_GROUP}
              group={group}
              student={this.props.student}
            />
          )}
          {this.props.accepted.map(group =>
            <GroupCard
              key={group._id}
              type={CARD_ACCEPTED}
              group={group}
              student={this.props.student}
            />
          )}
          {this.props.requested.map(group =>
            <GroupCard
              key={group._id}
              type={CARD_REQUESTED}
              group={group}
              student={this.props.student}
            />
          )}
          {this.props.untouched.map(group =>
            <GroupCard
              key={group._id}
              type={CARD_UNTOUCHED}
              group={group}
              student={this.props.student}
            />
          )}
        </div>
      </div>
    )
  }
}

export default createContainer((props) => {
  if (Meteor.user() !== undefined) {
    let studentEmail = Meteor.user().emails[0].address;
    let studentGroupReady = Meteor.subscribe('groups.forStudent', studentEmail, props.params.projectId).ready();
    let studentUntouchedReady = Meteor.subscribe('groups.untouchedGroupsForStudent', studentEmail, props.params.projectId).ready();
    let studentRequested = Meteor.subscribe('groups.studentRequests', studentEmail, props.params.projectId).ready();
    let studentAccepted = Meteor.subscribe('groups.acceptingStudent', studentEmail, props.params.projectId).ready();

    const groupQuery = {$and: [{"student_emails": studentEmail},{"project_id": props.params.projectId}]}
    const untouchedQuery = {$and: [{"project_id": props.params.projectId},
      {$and: [
        {"requests": {$ne: studentEmail}},
        {"accepted": {$ne: studentEmail}},
        {"student_emails": {$ne: studentEmail}},
      ]}
    ]};
    const studentRequestedQuery = {$and: [{"requests": studentEmail}, {"project_id": props.params.projectId}]};
    const studentAcceptedQuery = {$and: [{"accepted": studentEmail}, {"project_id": props.params.projectId}]};

    return {
      groupReady: studentGroupReady,
      untouchedReady: studentUntouchedReady,
      requestedReady: studentRequested,
      acceptedReady: studentAccepted,
      ready: true,
      group: Groups.find(groupQuery).fetch(),
      untouched: Groups.find(untouchedQuery).fetch(),
      requested: Groups.find(studentRequestedQuery).fetch(),
      accepted: Groups.find(studentAcceptedQuery).fetch(),
      student: studentEmail,
    }
  } else {
    return {ready: false}
  }

}, CurrentGroups);
