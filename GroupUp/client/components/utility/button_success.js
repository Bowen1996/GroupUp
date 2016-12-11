import React, {Component} from 'react';

/**
* Red bootstrap "danger" button
*/
export default class ButtonSuccess extends Component {
  /**
  * React render function
  */
  render() {
    return (
        <button
          onClick={this.props.onClick}
          className="btn btn-raised btn-success btn-block">
          {this.props.text}
        </button>
    );
  }
}
