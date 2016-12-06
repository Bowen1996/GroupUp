import React, {Component} from 'react';
import { Link, browserHistory } from 'react-router';
import Card from './card';

/**
* Dashboard used for student and professor dashboards
*/
export default class GeneralDashboard extends Component {
  /**
  * React render function
  */
  render() {
    return(
      <div className="container">
        <div className="row">
          <div className="col-md-8 col-center">
            <div className="panel panel-default">
              <div className="panel-heading text-center">
                <h3>{this.props.title}</h3>
              </div>
              <div className="panel-body">
                <h4>
                  {this.props.description}
                </h4>
                <div className="row">
                {this.props.isProfessor ?
                  <div className="col-md-8 col-center">
                      <Link to={"/create-project/" + "new-project"}>
                        <button
                          className="btn btn-default btn-raised btn-block">
                          New Class Project
                        </button>
                      </Link>
                  </div>
                  : null}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="margin-bottom"></div>
        <div className="row">
          {this.props.projects.map(project =>
            <Card key={project._id} title={project.name} description={project.description} deadline={project.deadline} link={this.props.link + "" + project._id} buttonText={this.props.buttonText}/>
          )}
        </div>
      </div>
    );
  }
}
