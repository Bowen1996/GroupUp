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

  goBack(event) {
    event.preventDefault();

    browserHistory.push('/');
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-6">
            <button onClick={this.goBack.bind(this)}
              className="btn btn-raised btn-default">
              &larr; Back</button>
          </div>
        </div>

        <div className="row">
          <div className="col-sm-12">
            <div className="panel panel-default">
              <div className="panel-heading">
                <h3>Create a {this.props.params.userType} account:</h3>
              </div>

              <div className="panel-body">
                <form className="col-sm-8 col-center">
                  <div className="form-group">
                    <input className="form-control" ref="email" type="text" placeholder="Enter email..." />
                  </div>
                  <div className="form-group">
                    <input className="form-control" ref="password" type="password" placeholder="Enter password..." />
                  </div>
                  <div className="form-group margin-bottom">
                    <input className="form-control" ref="confirmPassword" type="password" placeholder="Confirm password..." />
                  </div>
                </form>

                <div className="row">
                  <div className="col-sm-6">
                    <button
                      onClick={this.goBack.bind(this)}
                      className="btn btn-raised btn-danger btn-block">
                      CANCEL
                    </button>
                  </div>
                  <div className="col-sm-6">
                    <button
                      onClick={this.onSubmit.bind(this)}
                      className="btn btn-raised btn-default btn-block">
                      CREATE ACCOUNT
                    </button>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
