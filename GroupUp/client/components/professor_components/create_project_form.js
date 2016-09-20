import React, {Component} from 'react';

export default class CreateProjectForm extends Component {
  addSkill() {

  }

  uploadCSV() {

  }

  createGroup() {

  }

  render() {
    return (
      <div className="container">

        <div className="row">
          <div className="col-sm-6">
            <button className="btn btn-raised btn-default">&larr; Back</button>
          </div>
        </div>

        <div className="row">
          <div className="col-sm-12">
            <div className="panel panel-default">
              <div className="panel-heading">
                <h4>Once you create this new class, students will be able to group up together.</h4>
              </div>
            </div>
          </div>
        </div>


        <div className="row">
          <div className="col-sm-12">
            <div className="panel panel-default">
              <div className="panel-heading margin-bottom">
                <h3>Create a New Class Project</h3>
              </div>
              <div className="panel-body">
                <form className="col-sm-8 col-center">
                  <input className="form-control margin-bottom" ref="name" placeholder="Project Name..." />

                  <label>Description:</label>
                  <textarea className="form-control margin-bottom" ref="description" rows="3" />

                  <input className="form-control margin-bottom" ref="deadline" placeholder="Group Formation Deadline (mm/dd/yyyy)..."  />


                  <label>Acceptable # of Teammates:</label>
                  <div className="row margin-bottom">
                    <div className="col-sm-5">
                      <input className="form-control" ref="teammates-min" placeholder="Min teammates..."  />
                    </div>
                    <div className="col-sm-2">
                      <span>to</span>
                    </div>
                    <div className="col-sm-5">
                      <input className="form-control" ref="teammates-max" placeholder="Max teammates..."  />
                    </div>
                  </div>

                  <label>Relevant Skills Each Team Should Have:</label>
                  <p>Add some skills that would help students in this project. When joining this project, students will be able to check off which of these skills they have, to better balance teams.</p>
                  <div className="row">
                    <div className="col-sm-8">
                      <input className="form-control" ref="relevant skills" placeholder="Skill name..."  />
                    </div>
                    <div className="col-sm-4">
                      <button
                        onClick={this.addSkill.bind(this)}
                        className="btn btn-raised btn-default">
                        Add
                      </button>
                    </div>
                  </div>
                  <div className="row margin-bottom">
                    <div className="col-sm-12">
                      {/*Add in a title and a button for each skill. See tutorial.*/}
                    </div>
                  </div>

                  <label>Import Students Into Project (optional):</label>
                  <p>Create a CSV file with a single column containing the email addresses of students who will be allowed to use this website. In excel, you can save a spreadsheet as a CSV.</p>
                  <p>You can skip this step and manually add student emails, or upload the CSV later.</p>
                  <button
                    onClick={this.uploadCSV.bind(this)}
                    className="btn btn-raised btn-default margin-bottom">
                    Upload CSV File
                  </button>

                  <hr />

                  <div className="row margin-bottom">
                    <div className="col-sm-6">
                      <button
                        //onClick={this.onSubmit.bind(this)}
                        className="btn btn-raised btn-danger btn-block">
                        CANCEL
                      </button>
                    </div>
                    <div className="col-sm-6">
                      <button
                        onClick={this.createGroup.bind(this)}
                        className="btn btn-raised btn-default btn-block">
                        CREATE GROUP
                      </button>
                    </div>
                  </div>
                </form>

              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
