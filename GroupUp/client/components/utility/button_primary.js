import React, {Component} from 'react';

/**
* Blue-ish bootstrap "Primary" button
*/
export default class ButtonPrimary extends Component {
  /**
  * React render function
  */
  render() {
    return (
        <button
          onClick={this.props.onClick}
          className="btn btn-raised btn-primary btn-block">
          {this.props.text}
        </button>
    );
  }
}
