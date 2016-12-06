import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';
import { createContainer } from 'meteor/react-meteor-data';
import { Groups } from '../../../imports/collections/groups';

import Back from '../utility/back';
import GroupCard from '../student/group_card';

/**
* Presents a page of all the current groups in a project.
*/
class CurrentGroups extends Component {
  /**
  * React render function
  */
  render() {
    if (!this.props.ready) {return <span>loading...</span>}
    let groupMessage;
    if (this.props.groups.length > 0) {
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
          {this.props.groups.map(group =>
            <GroupCard
              key={group._id}
              link=""
              title={group.title}
              message={group.description}
            />
          )}
        </div>
      </div>
    )
  }
}

export default createContainer((props) => {
  return {
    ready: Meteor.subscribe('groups.inProject', props.params.projectId).ready(),
    groups: Groups.find({"project_id": props.params.projectId}).fetch(),
  }
}, CurrentGroups);
