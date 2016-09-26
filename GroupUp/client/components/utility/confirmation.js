import React, { Component } from 'react';
import { browserHistory } from 'react-router';

export default class Confirmation extends Component {
  constructor(props) {
    super(props);
  }

  next(nextLink) {
    browserHistory.push(nextLink);
  }

  render() {
    return (
      <div className="row">
        <div className="col-sm-8 col-center">
          <div className="panel panel-default">
            <div className="panel-heading">
              <h3>{this.props.title}</h3>
            </div>
            <div className="panel-body">
              <h4 className="margin-bottom">{this.props.message}</h4>
              <button
                onClick={() => this.next(this.props.nextLink)}
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
