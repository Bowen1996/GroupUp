import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';

/**
* General bootstrap card
*/
export default class Card extends Component {
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
              <h4 className="margin-bottom text-center">Description: {this.props.description}</h4>
              <h4 className="margin-bottom text-center">Deadline: {this.props.deadline}</h4>
                <button
                  className="btn btn-raised btn-default btn-block">
                  {this.props.buttonText}
                </button>
            </div>
          </div>
        </Link>
      </div>
    );
  }
}
