import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';

import ButtonDanger from '../../utility/button_danger';

export default class CopyLink extends Component {
  render() {
    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          <h3>Share The Link With Students</h3>
        </div>
        <div className="panel-body">
          <h3 className="text-center margin-bottom">groupup.com/project/example78999</h3>
          <p>
            Student Instructions:
          </p>
          <ol className="margin-bottom">
            <li>
              Visit groupup.com/project/example78999.
            </li>
            <li>
              Create a student account.
            </li>
            <li>
              Click on the project named "example".
            </li>
            <li>
              Fill out the "About Me" form so that other students can know more about you.
            </li>
            <li>
              See groups that other students have proposed, or create your own!
            </li>
          </ol>
          <div className="col-sm-8 col-center">
            <ButtonDanger link="" text="Copy Link & Instructions" />
          </div>
        </div>
      </div>
    );
  }
}
