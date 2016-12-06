import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';

/**
* User login component for splash screen
*/
export default class UserLogin extends Component {
  /**
   * Submits user login, signing student up for a class if they
   * are using a professor-supplied URL
   * @param event the click button event that should be prevented
   */
  onSubmit(event) {
    event.preventDefault();
    const email = this.refs.email.value;
    const password = this.refs.password.value;
    if (password != "" && email != "") {
      Meteor.loginWithPassword(email, password, (error) => {
        if(error) {
          console.log("Could not log in");
          console.log(error);
        } else {
          //Re-direct them to a page
          if (this.props.projectId && !Meteor.user().profile.isProfessor) {
            // If projectId given to student is in URL
            console.log("ID: " + this.props.projectId);
            console.log("CUR EMAIL: " + Meteor.user().emails[0].address);
            Meteor.call('projects.addStudentToProject', Meteor.user().emails[0].address, this.props.projectId);
          }
          if (Meteor.user().profile.isProfessor) {
            // The user is a professor
            browserHistory.push('/professor-dashboard/');
          } else {
            // The user is a student
            browserHistory.push('/student-dashboard/');
          }
        }
      });
    } else {
      console.log("Empty fields");
    }
  }

  /**
   * React render function
   */
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-6">
            <h3>Login</h3>
            <form>
              <div className="form-group">
                <input ref="email" type="text" name="email" placeholder="Enter email..." className="form-control"/>
              </div>
              <div className="form-group">
                <input ref="password" type="password" name="password" placeholder="Enter password..." className="form-control" />
              </div>
            </form>
            <button
              onClick={this.onSubmit.bind(this)}
              className="btn btn-raised btn-default">
              Log In
            </button>
          </div>
        </div>
      </div>
    );
  }
}
