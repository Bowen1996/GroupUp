import React, { Component } from 'react';
import Confirmation from './confirmation';

/**
* Confirmation page wrapper for creating a project
*/
export default class ConfirmationCreateProject extends Component {
  /**
  * React render function
  */
  render() {
    return (
      <Confirmation
        title="You just created a new project!"
        message="Click continue to see your project main page."
        link="/professor-dashboard"
        />
    );
  }
}
