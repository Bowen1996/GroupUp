import React, {Component} from 'react';

export default class AlertConfirmation extends Component {
  render() {
    return (
      <div className="alert alert-dismissible alert-primary">
        {this.props.message}
      </div>
    );
  }
}
