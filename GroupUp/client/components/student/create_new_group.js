import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';

import Back from '../utility/back';
import Button from '../utility/button';

/**
* Presents a form enabling students to create a group.
*/
export default class CreateNewGroup extends Component {
  /**
  * Submit the new group, update the database
  * @param e, the click event
  */
  submit(e) {
    e.preventDefault();
    const groupData = {
      project_id: this.props.params.projectId,
      student_emails: [Meteor.user().emails[0].address],
      title: this.refs.name.value,
      description: this.refs.description.value,
      looking_for: this.refs.lookingFor.value,
    };
    Meteor.call('groups.addGroup', this.props.params.projectId, groupData);

    // Navigate back to the "my group" page
    browserHistory.push('/my-group/' + this.props.params.projectId);
  }

  /**
  * React render function
  */
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-8 col-center">
            <Back link={"/my-group/" + this.props.params.projectId} />
            <div className="panel panel-default">
              <div className="panel-heading text-center">
                <h3>Propose a New Group</h3>
              </div>
              <div className="panel-body text-center">
                <form className="col-sm-8 col-center">
                  <div className="form-group">
                    <label>Project Name:</label>
                    <input className="form-control" ref="name" />
                  </div>
                  <div className="form-group">
                    <label>Description:</label>
                    <textarea className="form-control" ref="description" rows="3" />
                  </div>
                  <div className="form-group">
                    <label>Looking for group memebers that:</label>
                    <textarea className="form-control" ref="lookingFor" rows="3" />
                  </div>
                  <br></br>
                  <div className="row">
                    <div className="col-sm-6 col-center">
                      <Button onClick={this.submit.bind(this)} text="Create Group" />
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
