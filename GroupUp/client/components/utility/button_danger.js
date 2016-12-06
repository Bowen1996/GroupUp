import React, {Component} from 'react';

/**
* Red bootstrap "danger" button
*/
export default class ButtonDanger extends Component {
  /**
  * React render function
  */
  render() {
    return (
        <button
          onClick={this.props.onClick}
          className="btn btn-raised btn-danger btn-block">
          {this.props.text}
        </button>
    );
  }
}
