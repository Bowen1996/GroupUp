import React, {Component} from 'react';
import { Link, browserHistory } from 'react-router';
import Card from '../utility/card';

export default class ProfessorDashboard extends Component {
  render() {
    return(
      <div className="container">

        <div className="row">
          <div className="col-md-8 col-center">
            <div className="panel panel-default">
              <div className="panel-heading text-center">
                <h3>Professor Dashboard</h3>
              </div>
              <div className="panel-body">
                <h4>
                  Welcome! GroupUp is a tool for students to create groups for class projects.
                  Click below to create a class project, set a group formation deadline, and import students.
                </h4>

                <div className="row">
                  <div className="col-md-8 col-center">
                      <Link to="/create-project">
                        <button
                          className="btn btn-default btn-raised btn-block">
                          New Class Project
                        </button>
                      </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="margin-bottom"></div>

        <div className="row">
          <Card title="Project #1" message="A note about the project" link="/" buttonText="Project Settings"/>
        </div>

      </div>
    );
  }

}
