import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';

import Button from '../utility/button';
import ButtonSuccess from '../utility/button_success';
import ButtonDanger from '../utility/button_danger';
import ButtonPrimary from '../utility/button_primary';

const CARD_GROUP = 0;
const CARD_REQUESTED = 1;
const CARD_ACCEPTED = 2;
const CARD_UNTOUCHED = 3;

/**
* Button that allows user to request to join a group, etc.
* based on the current state, or "type" of the button
*/
export default class DynamicGroupButton extends Component {
  /**
   * Constructor, initializes state
   */
  constructor(props) {
    super(props);
    this.state = { type: props.type };
  }

  /**
  * Student request to join current group
  */
  requestToJoin() {
    Meteor.call('groups.requestJoinGroup', this.props.student, this.props.group._id);
    this.setState({ type: CARD_REQUESTED});
  }

  joinGroup() {
    Meteor.call('groups.officiallyJoinGroup', this.props.student, this.props.group._id, this.props.group.project_id);
    browserHistory.push('/my-group/' + this.props.group.project_id);
  }

  /**
  * React render function
  */
  render() {
    let actionButton;
    switch (this.state.type) {
      case CARD_GROUP:
        actionButton = (
          <Link to={"/my-group/" + this.props.group.project_id}>
            <ButtonSuccess onClick='' text="Your Group" />
          </Link>
        );
        break;
      case CARD_REQUESTED:
        actionButton = (<ButtonDanger onClick='' text="Requested" />);
        break;
      case CARD_ACCEPTED:
        actionButton = (<ButtonPrimary onClick={this.joinGroup.bind(this)} text="Join Group" />);
        break;
      default:
        actionButton = (<ButtonSuccess onClick={this.requestToJoin.bind(this)} text="Ask to join" />);
    }
    return (
      <div>
        {actionButton}
      </div>
    )
  }
}
