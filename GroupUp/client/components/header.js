import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';

/**
* Navigation bar header
*/
export default class Header extends Component {
  /**
  * Logs the current user out of the application
  */
  logout() {
    Meteor.logout(() => {
      console.log("logout successful!");
    });
    //browserHistory.push("/");
  }

  /**
  * React render function
  */
  render() {
    return (
      <nav className="nav navbar-default">
        <div>
          <Link to="/" className="navbar-brand">HOME</Link>
          <Link to="/" onClick={this.logout.bind(this)} className="navbar-brand float-right">LOG OUT</Link>
        </div>
      </nav>
    );
  }
}
