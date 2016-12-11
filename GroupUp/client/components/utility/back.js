import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';

/**
* Back button
*/
export default class Back extends Component {
  /**
  * Perform a hard browser back if no link is specified
  */
  goBack() {
    browserHistory.goBack();
  }
  
  /**
  * React render function
  */
  render() {
    let backButton;
    if (this.props.link) {
      backButton = (
        <Link to={this.props.link}>
          <button
            className="btn btn-raised btn-default">
            &larr; Back
          </button>
        </Link>
      )
    } else {
      backButton = (
          <button
            onClick={this.goBack.bind(this)}
            className="btn btn-raised btn-default">
            &larr; Back
          </button>
      )
    }
    return (
      <div className="row">
        <div className="col-sm-6">
          {backButton}
        </div>
      </div>
    );
  }
}
