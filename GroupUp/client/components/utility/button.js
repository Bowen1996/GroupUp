import React, {Component} from 'react';
import { Link, browserHistory } from 'react-router';

export default class Button extends Component {
  render() {
    return (
      <Link to={this.props.link}>
        <button
          className="btn btn-raised btn-default btn-block">
          {this.props.text}
        </button>
      </Link>
    );
  }
}
