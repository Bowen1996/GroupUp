import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';
import { Groups } from '../../../imports/collections/groups';
import { createContainer } from 'meteor/react-meteor-data';

import ProfileCard from '../student/profile_card';
import ButtonSuccess from '../utility/button_success';
import ButtonDanger from '../utility/button_danger';
import Back from '../utility/back';
import DynamicGroupButton from './dynamic_group_button';

/**
* Page with information about any group
*/
class GroupProfile extends Component {
  /**
  * React render function
  */
  render() {
    if (!this.props.ready) {return <span>loading...</span>}
    //console.log(this.props.params.type);
    return (
      <div className="container">
        <Back />
        <div className="row bottom-buffer">
          <div className="col-md-12 col-center">
            <div className="panel panel-default">
              <div className="panel-heading text-center">
                <h3>Group Profile: {this.props.group.title}</h3>
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
                        {this.props.group.student_emails.map(student =>
                          <ProfileCard
                            key={"in_group_card_" + student}
                            student={student}
                            groupId={this.props.group._id}
                            projectId={this.props.group.project_id}
                            imageLink="https://x1.xingassets.com/assets/frontend_minified/img/users/nobody_m.original.jpg"
                            buttonText="Profile"
                            displayAccept="false"
                          />
                        )}
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-4 col-center">
                        <DynamicGroupButton
                          type={+this.props.params.type}
                          group={this.props.group}
                          student={this.props.student}
                          />
                      </div>
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

export default createContainer((props) => {
  if (Meteor.user() !== undefined) {
    let ready = Meteor.subscribe('groupById', props.params.groupId).ready();
    let group = Groups.findOne({"_id": props.params.groupId});
    let student = Meteor.user().emails[0].address;
    return {
      ready: ready,
      group: group,
      student: student,
    }
  } else {
    return {ready: false}
  }
}, GroupProfile);
