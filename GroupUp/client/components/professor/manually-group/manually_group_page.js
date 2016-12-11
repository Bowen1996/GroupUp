import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';
import { createContainer } from 'meteor/react-meteor-data';
import { Projects } from '../../../../imports/collections/projects';
import { Groups } from '../../../../imports/collections/groups';
import ManuallyGroupStudentGroupsPanel from './manually_group_student_groups_panel';
import ManuallyGroupStudentItem from './manually_group_student_item';
import Back from '../../utility/back';

/**
* Presents the Manualy Grouping page, which can used by professors to group students as they choose.
*/
class ManuallyGroupPage extends Component {
  /**
   * Constructor, initializes state
   */
  constructor(props) {
    super(props);
  }

  /**
  * Moves the currently selected people to the selected group
  */
  moveToGrouped() {
    var groupRadios = document.getElementsByName('pushToGroup');
    var x = -1;
    for (var n = 0; n < groupRadios.length; n++) {
      if (groupRadios[n].checked) {
        x = n;
      }
    }

    let project_id = this.props.project._id;
    let group_id = this.props.groups[x]._id;

    $('#ungrouped .active').each(function(index) {
      var email = $(this).text();
      Meteor.call('groups.officiallyJoinGroup', email, group_id, project_id);
      $(this).removeClass("active");
    });
  }

  /**
  * Gets the groupId of a given group in the DOM
  */
  getGroupId(index) {
    return this.props.groups[index]._id;
  }

  /**
  * Moves the currently selected people to the ungrouped students.
  */
  moveToUngrouped() {
    var x = 0;
    let project_id = this.props.project._id;
    var self = this;

    $('.manually_group_item').each(function(index) {
      let group_id = self.getGroupId(x);

      $(this).find('.active').each(function(index) {
        var email = $(this).text();
        Meteor.call('projects.removeStudentFromGroup', email, group_id);
        $(this).removeClass("active");
      });

      x++;
    });
  }

  /**
  * React render function
  */
  render() {
    if (!this.props.project_ready || !this.props.groups_ready) { return <span>Loading...</span> }

    return(
      <div className="container">
        <div className="row">
          <div className="col-md-2">
            <Back link={"/project-dashboard/" + this.props.params.projectId} />
          </div>
          <div className="col-md-8 col-offest-md-2">
            <div className="panel panel-default">
              <div className="panel-heading text-center">
                <h3>Manually Group Students</h3>
              </div>
              <div className="panel-body">
                <h4>
                  Select students with the checkbox next to their name and then click
                  the right arrow button to group the students in a group. Click on the
                  checkbox next to a group student and then click the left arrow button
                  to ungroup that student.
                </h4>
                <h4>
                  If you have inputted a new CSV file and the results are below are not correct, please refresh the page.
                </h4>
                <div className="col-sm-3 col-center">
                  <form method="POST">
                    <button
                      className="btn btn-default btn-raised btn-block"
                      onClick="">
                      Refresh
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row top-buffer">
          <div className="col-sm-5">
            <div className="panel panel-default">
              <div className="panel-heading">Ungrouped Students</div>
              <div id="ungrouped" className="list-group-orig panel-body">
                {this.props.project.ungrouped.map(studentEmail =>
                  <ManuallyGroupStudentItem email={studentEmail} />
                )}
              </div>
            </div>
          </div>
          <div className="col-sm-2">
            <button
              className="btn btn-default btn-raised btn-block"
              onClick={this.moveToGrouped.bind(this)}>
              &gt;
            </button>
            <button
              className="btn btn-default btn-raised btn-block"
              onClick={this.moveToUngrouped.bind(this)}>
              &lt;
            </button>
          </div>
          <div id="grouped" className="col-sm-5">
            <form action="">
              {this.props.groups.map(group =>
                <ManuallyGroupStudentGroupsPanel title={group.title} group={group.student_emails} />
              )}
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default createContainer((props) => {
  return {
    project_ready: Meteor.subscribe('projectsById', props.params.projectId).ready(),
    groups_ready: Meteor.subscribe('groups.inProject', props.params.projectId).ready(),
    project: Projects.findOne(props.params.projectId),
    groups: Groups.find({"project_id": props.params.projectId}).fetch()
  }
}, ManuallyGroupPage);
