import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';
import { Groups } from '../../../imports/collections/groups';

import ProfileCard from '../student/profile_card';

/**
* Presents a card for a student who is requesting to join the current student's group.
*/
export default class RequestsCard extends Component {
  /**
  * React render function
  */
  render() {
    return (
      <div className="row bottom-buffer">
        <div className="col-md-12 col-center">
          <div className="panel panel-default">
            <div className="panel-heading text-center">
              <h3>People Who Asked to Join My Group</h3>
            </div>
            <div className="panel-body text-center">
              <div className="row">
                <div className="col-sm-12 col-center">
                  {this.props.group.requests.map(request =>
                    <ProfileCard
                      key={"profile_card_" + request}
                      email={request}
                      projectId={this.props.projectId}
                      imageLink="https://x1.xingassets.com/assets/frontend_minified/img/users/nobody_m.original.jpg"
                      buttonText="Profile"
                      displayAccept="true"
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
