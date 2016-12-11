import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';
//import { createContainer } from 'meteor/react-meteor-data';

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
  }

  /**
  * React render function
  */
  render() {
    /*
    let studentNavOptions;
    if (!this.props.ready) {
      studentNavOptions = null;
    } else {
      if (!this.props.isProfessor) {
        studentNavOptions = (
          <Link to="/" onClick={this.logout.bind(this)} className="navbar-brand float-right">TEST</Link>
        );
      }
    }
    */
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

/*
export default createContainer((props) => {
  if (Meteor.user() !== undefined) {
    return {
      ready: true,
      isProfessor: Meteor.user().profile.isProfessor,
    }
  } else {
    return {ready: false}
  }
}, Header);
*/
