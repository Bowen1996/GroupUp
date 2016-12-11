import React, { Component } from 'react';
import ManuallyGroupStudentItem from './manually_group_student_item';

/**
* Panel component used to display each group in the Manually Group page.
*/
export default class ManuallyGroupStudentGroupsPanel extends Component {
  /**
   * Constructor, initializes state
   */
  constructor(props) {
    super(props);
  }

  /**
  * React render function
  */
  render() {
    return(
      <div className="panel panel-default">
        <div className="panel-heading">
          <input type="radio" id="groupRadioButton" name="pushToGroup" />
          {this.props.title}
        </div>
        <div className="list-group-orig panel-body manually_group_item">
          {this.props.group.map(studentEmail =>
            <ManuallyGroupStudentItem email={studentEmail} />
          )}
        </div>
      </div>
    )
  }
}
