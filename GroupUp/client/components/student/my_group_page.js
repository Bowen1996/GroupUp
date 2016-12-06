import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';
import { createContainer } from 'meteor/react-meteor-data';
import { Groups } from '../../../imports/collections/groups';

import Back from '../utility/back';
import Button from '../utility/button';
import ButtonDanger from '../utility/button_danger';
import GroupCard from '../student/group_card';
import ProfileCard from '../student/profile_card';
import AcceptedCard from './accepted_card';
import RequestsCard from './requests_card';
import NoGroupCard from './no_group_card';
import MyGroupCard from './my_group_card';

/**
* Presents the "My Group Page". If the student is not in a group, it gives the
* option to create a group or join a group. Else, the student is presented with
* his/her current group and shows the students who have requested to join the group.
*/
class MyGroup extends Component {
  /**
  * React render function
  */
  render() {
    if (!this.props.ready) {return <span>loading...</span>}
    let renderContent;

    // User is not in a group
    if (!this.props.group) {
      renderContent = (
        <NoGroupCard projectId={this.props.params.projectId} />
      )

    // User is in a group
    } else {
      renderContent = (
        <div>
          <MyGroupCard projectId={this.props.params.projectId} group={this.props.group} />
          <RequestsCard projectId={this.props.params.projectId} group={this.props.group} />
        </div>
      )
    }
    return (
      <div className="container">
        <Back link="/student-dashboard/" />
        {renderContent}
        <AcceptedCard projectId={this.props.params.projectId}/>
      </div>
    )
  }
}

export default createContainer((props) => {
  if (Meteor.user() !== undefined) {
    let ready = Meteor.subscribe('groups.forStudent', Meteor.user().emails[0].address, props.params.projectId).ready();
    let group = Groups.findOne({$and: [{"student_emails": Meteor.user().emails[0].address},{"project_id": props.params.projectId}]});
    return {
      ready: ready,
      group: group,
    }
  } else {
    return {ready: false}
  }
}, MyGroup);
