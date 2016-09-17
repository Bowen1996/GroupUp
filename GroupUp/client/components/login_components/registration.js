import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';
import { Accounts } from 'meteor/accounts-base';

export default class UserLogin extends Component {
  onSubmit(event) {
    //Uncomment logic below for actual authentication and user creation
    event.preventDefault();

    const email = this.refs.email.value;
    const password = this.refs.password.value;
    const confirmPassword = this.refs.confirmPassword.value;

    if (password == confirmPassword && password != "" && confirmPassword != "" && email != "") {
      const isProfessor = this.props.params.userType == "professor";

      const accountInfo = {
        email: email,
        password: password,
        profile: {
          isProfessor: isProfessor,
        }
      };
      Accounts.createUser(accountInfo, (error) => {
        if(error) {
          console.log(error);
        } else {
          Meteor.loginWithPassword(email, password, (error) => {
            if(error) {
              console.log("Could not log in");
            } else {
              //Re-direct them to a page
              browserHistory.push('/confirmation/');
            }
          });
        }
      });
    } else {
        console.log("Not equal");
    }
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-6 margin-30">
            <div className="panel panel-default">
              <div className="panel-heading">
                <h1>Create a {this.props.params.userType} account:</h1>
              </div>

              <div className="panel-body">
                <form>
                  <input ref="email" type="text" name="email" placeholder="Enter email..." className="form-control"/>
                  <input ref="password" type="password" name="password" placeholder="Enter password..." className="form-control" />
                  <input ref="confirmPassword" type="password" name="confirmPassword" placeholder="Confirm password..." className="form-control" />
                </form>
                <button
                  onClick={this.onSubmit.bind(this)}
                  className="btn btn-raised btn-default">
                  Create Account
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
