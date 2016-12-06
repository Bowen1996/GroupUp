import React, {Component} from 'react';

/**
* Standard bootstrap button
*/
export default class Button extends Component {
  /**
  * React render function
  */
  render() {
    return (
        <button
          onClick={this.props.onClick}
          className="btn btn-raised btn-default btn-block">
          {this.props.text}
        </button>
    );
  }
}
