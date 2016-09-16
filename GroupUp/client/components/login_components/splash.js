import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';

import UserLogin from './user_login';

export default class Splash extends Component {
  createStudentAccount() {
    //Route
    browserHistory.push('/registration/' + 'student');
  }

  createProfessorAccount() {
    //Route
    browserHistory.push('/registration/' + 'professor');
  }

  render() {
    return (
      <div className="height-50">
        <div className="row vertical-center">
          <div className="col-sm-6">
            <UserLogin />
          </div>

          <div className="col-sm-6">
            <button className="btn btn-default" onClick={this.createStudentAccount.bind(this)}>Create Student Account</button>
            <br />
            <button className="btn btn-default" onClick={this.createProfessorAccount.bind(this)}>Create Professor Account</button>
          </div>
        </div>
      </div>
    );
  }
}
