import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';
import { Accounts } from 'meteor/accounts-base';

export default class UserLogin extends Component {
  onSubmit(event) {
    browserHistory.push('/confirmation/');

    //Uncomment logic below for actual authentication and user creation
    /*
    event.preventDefault();

    const email = this.refs.email.value;
    const password = this.refs.password.value;
    const confirmPassword = this.refs.confirmPassword.value;

    if (password == confirmPassword && password != "" && confirmPassword != "") {
      const accountInfo = {
        email: email,
        password: password,
      };
      Accounts.createUser(accountInfo, (error) => {
        if(error) {
          console.log("Error");
        } else {
          Meteor.loginWithPassword(email, password, (error) => {
            if(error) {
              console.log("Could not log in");
            } else {
              //Re-direct them to a page
              console.log("Success!");
            }
          });
        }
      });
    } else {
        console.log("Not equal");
    }
    */
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-6">
            <h1>Create a {this.props.params.userType} account:</h1>

            <form>
              <input ref="email" type="text" name="email" placeholder="Enter email..." className="form-control"/>
              <input ref="password" type="password" name="password" placeholder="Enter password..." className="form-control" />
              <input ref="confirmPassword" type="password" name="confirmPassword" placeholder="Confirm password..." className="form-control" />
            </form>
            <button
              onClick={this.onSubmit.bind(this)}
              className="btn btn-default">
              Create Account
            </button>
          </div>
        </div>
      </div>
    );
  }
}
