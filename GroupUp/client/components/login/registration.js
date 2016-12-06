import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';
import { Accounts } from 'meteor/accounts-base';

import WarningMessage from '../utility/warning_message';
const MAX_SIZE = 3000000;

/**
* Register as professor or student user
*/
export default class UserLogin extends Component {
  /**
   * Constructor, initializes state
   */
  constructor(props) {
    super(props);
    this.state = { warning: false };
  }

  /**
   * Sets up slingshot plugin for image uploads
   */
  componentWillMount(){
    // we create this rule both on client and server
    Slingshot.fileRestrictions("avatar", {
      allowedFileTypes: ["image/png", "image/jpeg", "image/gif"],
      maxSize: 10 * 500 * 500
    });
  }

  /**
   * Uploads image to amazon S3 database
   */
  uploadImage() {
    if(this.refs.image.files[0] == null) {
      return "/images/facebook-avatar.jpg";
    }
    var userId = Meteor.user()._id;
    var metaContext = {avatarId: userId};
    var uploader = new Slingshot.Upload("UsersAvatar", metaContext);
    uploader.send(this.refs.image.files[0], function (error, downloadUrl) {
      if (error) {
        console.error('Error uploading', uploader.xhr.response);
        alert (error);
      }
      else {

        //Update user
        Meteor.call('updateUserImage', Meteor.userId(), downloadUrl);
      }
    }.bind(this));
  }

  /**
   * Replaces default image with loading gif, and finally the new image.
   * @param e, event that returns the image to upload
   */
  selectImage(e) {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > MAX_SIZE) {
      this.setState({ warning: true });
      return;
    } else {
      if (this.state.warning) {
        this.setState({ warning: false });
      }
    }
    this.refs.profileImagePreview.src = "/images/loading.gif";
    const reader = new FileReader();
    reader.onload = function (e) {
      const uploadedImage = e.target.result;
      this.refs.profileImagePreview.src = uploadedImage;
    }.bind(this)
    reader.readAsDataURL(file);
  }

  /**
   * Submits the registration request, updating the database.
   * @param event, the click buttont even that should be prevented
   */
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
        }
      };
      Accounts.createUser(accountInfo, function(e) {
        if(e) {
          console.log(e);
        } else {
          Meteor.loginWithPassword(email, password, function(e) {
            if(e) {
              console.log(e);
            } else {
              this.uploadImage();

              // If student is using the link given by professor to sign up for a class
              if (this.props.params.projectId && !Meteor.user().profile.isProfessor) {
                console.log("ID: " + this.props.params.projectId);
                console.log("CUR EMAIL: " + Meteor.user().emails[0].address);
                Meteor.call('projects.addStudentToProject', Meteor.user().emails[0].address, this.props.params.projectId);
              }

              // If professor, route to professor confirmation page
              if(Meteor.user().profile.isProfessor) {
                browserHistory.push('/confirmation-account');
              } else {
                browserHistory.push('/confirmation-account-student');
              }
            }
          }.bind(this));
        }
      }.bind(this));
    } else {
        console.log("Not equal");
    }
  }

  /**
   * Returns to the home page
   */
  goBack(event) {
    event.preventDefault();
    browserHistory.push('/');
  }

  /**
   * React render function
   */
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
                    <label className="btn btn-raised btn-block btn-file">
                      Upload Profile Image <input ref="image" onChange={this.selectImage.bind(this)} className="display-none" type="file" name="imgFile" accept="image/png, image/jpeg, image/gif" />
                    </label>
                    { this.state.warning ? <WarningMessage message="Image size is too large. Please use an image < 3mb" /> : null }
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
