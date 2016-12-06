import React, { Component } from 'react';
import Confirmation from './confirmation';

/**
* Confirmation page wrapper for creating a student account
*/
export default class ConfirmationAccountStudent extends Component {
  /**
  * React render function
  */
  render() {
    return (
      <Confirmation
        title="Your GroupUp profile is set up!"
        message="Now you are ready to start using GroupUp!"
        link="/student-dashboard"
        />
    );
  }
}
