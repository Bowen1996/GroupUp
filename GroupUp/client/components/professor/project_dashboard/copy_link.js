import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';
import copy from 'copy-to-clipboard';

import ButtonDanger from '../../utility/button_danger';
import AlertConfirmation from '../../utility/alert_confirmation';

/**
* Copy link, along with instructions for students about joining the project
*/
export default class CopyLink extends Component {
  /**
  * Constructor, initializes state
  */
  constructor(props) {
    super(props);
    this.state = { copied: false };
  }

  /**
  * Copies the link to share with students
  * @param e, the click event
  */
  copyLink(e) {
    e.preventDefault();
    const projectId = this.props.projectId;
    copy("Visit: http://localhost:3000/" + projectId + ". Create an account, and click on the project named example.");
    this.setState({ copied: true });
  }

  /**
  * React render function
  */
  render() {
    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          <h3>Share The Link With Students</h3>
        </div>
        <div className="panel-body">
          <h3 className="text-center margin-bottom">groupup.com/{this.props.projectId}</h3>
          <p>
            Student Instructions:
          </p>
          <ol ref="instructions" className="margin-bottom">
            <li>
              Visit groupup.com/{this.props.projectId}
            </li>
            <li>
              Create a student account
            </li>
            <li>
              Click on the project named "{this.props.name}"
            </li>
          </ol>
          <div className="col-sm-8 col-center">
            <ButtonDanger onClick={this.copyLink.bind(this)} text="Copy Link & Instructions" />
            { this.state.copied ? <AlertConfirmation message="Link copied to clipboard. Paste in email to students." /> : null }
          </div>
        </div>
      </div>
    );
  }
}
