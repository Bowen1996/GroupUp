import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';

export default class Header extends Component {
  render() {
    return (
      <nav className="nav navbar-default">
        <div className="navbar-header">
          <Link to="/" className="navbar-brand">HOME</Link>
        </div>
      </nav>
    );
  }
}
