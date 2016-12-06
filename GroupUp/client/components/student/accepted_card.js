import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';
import { createContainer } from 'meteor/react-meteor-data';
import { Groups } from '../../../imports/collections/groups';

import GroupCard from '../student/group_card';

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
                        link=""
                        title={group.title}
                        message={group.description}
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
    //TODO: get the groups that a student has been ACCEPTED TO
    // Groups that have accepted the student
    let ready = Meteor.subscribe('groups.studentRequests', Meteor.user().emails[0].address, props.projectId).ready()
    let acceptedGroups = Groups.find({"requests": Meteor.user().emails[0].address}).fetch();
    return {
      ready: ready,
      acceptedGroups: acceptedGroups,
    }
  } else {
    return {ready: false}
  }
}, AcceptedCard);
