import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';

/**
* A card displaying the group's title and description. Also gives option to view
* the group's page or to request to join the group.
*/
export default class GroupCard extends Component {
  /**
  * React render function
  */
  render() {
    return (
      <div className="col-sm-4">
        <Link to={this.props.link} className="no-link-style">
          <div className="panel panel-default">
            <div className="panel-body">
              <h3 className="margin-bottom text-center">{this.props.title}</h3>
              <h4 className="margin-bottom text-center">{this.props.message}</h4>

              <div className="row">
                <div className="col-md-6">
                  <button
                    className="btn btn-raised btn-default btn-block">
                    Info
                  </button>
                </div>
                <div className="col-md-6">
                  <button
                    className="btn btn-raised btn-success btn-block">
                    Join
                  </button>
                </div>
              </div>

            </div>
          </div>
        </Link>
      </div>
    )
  }
}
