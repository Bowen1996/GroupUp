import React, { Component } from 'react';
import Confirmation from './confirmation';

/**
* Confirmation page wrapper for creating a professor account
*/
export default class ConfirmationAccount extends Component {
  /**
  * React render function
  */
  render() {
    return (
      <Confirmation
        title="Your GroupUp profile is set up!"
        message="Now you are ready to start using GroupUp!"
        link="/professor-dashboard"
        />
    );
  }
}
