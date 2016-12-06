import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';

/**
* General statistics about the project, and student grouping information
*/
export default class ProjectStats extends Component {
  /**
  * Constructor, initializes state
  */
  constructor(props) {
    super(props);
    this.state = { projectStats: null };
  }

  /**
  * Puts the statistics for the group in the state object
  */
  groupStats() {
    Meteor.call('getGroupStats', this.props.projectId, function(e, result) {
      this.setState({ projectStats: result });
    }.bind(this));
  }

  /**
  * React componendDidMount function
  * Gets group stats on load
  */
  componentDidMount() {
    this.groupStats();
  }

  /**
  * React render function
  */
  render() {
    if (this.state.projectStats === null) {return <span>Loading...</span>}
    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          <h3>Project Statistics</h3>
        </div>
        <div className="panel-body">
          <row>
            <div className="col-sm-3 text-center">
              <p># of filled groups: </p>
              <h3>{this.state.projectStats.classified_groups.filled.length}</h3>
            </div>
            <div className="col-sm-3 text-center">
              <p># of unfilled groups: </p>
              <h3>{this.state.projectStats.classified_groups.too_small.length}</h3>
            </div>
            <div className="col-sm-3 text-center">
              <p># of student grouped: </p>
              <h3>{this.state.projectStats.num_grouped}</h3>
            </div>
            <div className="col-sm-3 text-center">
              <p># students not grouped: </p>
              <h3>{this.state.projectStats.num_ungrouped}</h3>
            </div>
          </row>
        </div>
      </div>
    );
  }
}
