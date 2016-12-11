import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';

import Button from '../utility/button';
import ButtonSuccess from '../utility/button_success';
import ButtonDanger from '../utility/button_danger';
import DynamicGroupButton from './dynamic_group_button';

const CARD_GROUP = 0;
const CARD_REQUESTED = 1;
const CARD_ACCEPTED = 2;
const CARD_UNTOUCHED = 3;

/**
* A card displaying the group's title and description. Also gives option to view
* the group's page or to request to join the group.
*/
export default class GroupCard extends Component {
  /**
  * React render function
  */
  render() {
    return (
      <div className="col-sm-4">
          <div className="panel panel-default">
            <div className="panel-body">
              <h3 className="margin-bottom text-center">{this.props.group.title}</h3>
              <h4 className="margin-bottom text-center">{this.props.group.description}</h4>
              <div className="row">
                <div className="col-md-6">
                  <Link to={"/group-profile/" + this.props.group._id + "/" + this.props.type} className="no-link-style">
                    <Button onClick="" text="Info" />
                  </Link>
                </div>
                <div className="col-md-6">
                  <DynamicGroupButton
                    type={this.props.type}
                    group={this.props.group}
                    student={this.props.student}
                    />
                </div>
              </div>
            </div>
          </div>
      </div>
    )
  }
}
