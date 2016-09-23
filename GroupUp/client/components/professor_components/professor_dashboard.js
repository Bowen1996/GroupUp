import React, {Component} from 'react';

export default class ProfessorDashboard extends Component {
  goToCreateProjectForm() {
    browserHistory.push('/create-project')
  }

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
                      <button
                        onClick={this.goToCreateProjectForm.bind(this)}
                        className="btn btn-raised btn-block">
                        New Class Project
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