import React, {Component} from 'react';
import { Link, browserHistory } from 'react-router';

export default class ButtonDanger extends Component {
  render() {
    return (
      <Link to={this.props.link}>
        <button
          className="btn btn-raised btn-danger btn-block">
          {this.props.text}
        </button>
      </Link>
    );
  }
}
