import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';
import { createContainer } from 'meteor/react-meteor-data';
import { Groups } from '../../../imports/collections/groups';

import Button from '../utility/button';

/**
* Card that displays on the my group page when student is not grouped
*/
export default class NoGroupCard extends Component {
  /**
  * React render function
  */
  render() {
    return (
      <div className="row bottom-buffer">
        <div className="col-md-12 col-center">
          <div className="panel panel-default">
            <div className="panel-heading text-center">
              <h3>My Group</h3>
            </div>
            <div className="panel-body text-center">
              <h4>
                You can join a current group, or start a new group that others can join.
              </h4>
              <div className="row">
                <div className="col-md-5 col-md-offset-1">
                  <Link to={"/current-groups/" + this.props.projectId}>
                    <Button onClick="" text="Ask to join a Current Group" />
                  </Link>
                </div>
                <div className="col-md-5">
                  <Link to={"/create-new-group/" + this.props.projectId}>
                    <Button onClick="" text="Create a New Group" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
