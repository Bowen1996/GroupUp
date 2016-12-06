import React, {Component} from 'react';

/**
* Bootstrap alert message
*/
export default class AlertConfirmation extends Component {
  /**
  * React render function
  */
  render() {
    return (
      <div className="alert alert-primary text-center">
        {this.props.message}
      </div>
    );
  }
}
