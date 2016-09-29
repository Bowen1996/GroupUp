import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';
import { Accounts } from 'meteor/accounts-base';

let profileImage = null;

export default class UserLogin extends Component {
  uploadImage(e) {
    this.refs.profileImagePreview.src = "/images/loading.gif";
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
      profileImage = new Uint8Array(reader.result);

      Meteor.call('convertImage', profileImage, function(e, result) {
        this.refs.profileImagePreview.src = 'data:image/png;base64,' + result;
      }.bind(this));
    }.bind(this);
    reader.readAsArrayBuffer(file);
  }

  onSubmit(event) {
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
          image: profileImage,
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
              browserHistory.push('/confirmation-account');
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
                  <div className="col-sm-8 col-center">
                    <div className="form-group">
                      <img ref="profileImagePreview" src="/images/facebook-avatar.jpg" className="img-rounded img-responsive col-center" />
                    </div>
                    <input onChange={this.uploadImage.bind(this)} type="file" name="Upload Profile Picture (Optional)" accept="image/*" />

                  </div>
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
