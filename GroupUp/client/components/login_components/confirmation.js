import React, { Component } from 'react';

export default class Confirmation extends Component {
  render() {
    return (
      <div className="row">
        <div className="col-sm-8 col-center">
          <div className="panel panel-default">
            <div className="panel-heading">
              <h3>Your GroupUp profile is set up!</h3>
            </div>
            <div className="panel-body">
              <h4 className="margin-bottom">Now you are ready to start using GroupUp!</h4>
              <button
                //onClick={this.uploadCSV.bind(this)}
                className="btn btn-raised btn-default btn-block">
                Continue
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
