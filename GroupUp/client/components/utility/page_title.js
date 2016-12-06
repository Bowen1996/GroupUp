import React, { Component } from 'react';

/**
* General title for the top of pages
*/
export default class PageTitle extends Component {
  /**
  * React render function
  */
  render() {
    return (
        <div className="panel panel-default">
          <div className="panel-heading">
            <h3>{this.props.title}</h3>
          </div>
        </div>
    );
  }
}
