import React, {Component} from 'react';
import ScheduleGridItem from './schedule_grid_item';

let scheduleArray = [];

/**
* Schedule picker widget for students to input their weekly schedules
*/
export default class SchedulePicker extends Component {
  /**
  * Fill the initial schedule array with 0s, or with default props array
  */
  initializeArray() {
    if (this.props.scheduleArray) {
      // A current schedule has been passed in
      scheduleArray = this.props.scheduleArray;
    } else {
      // Intitalize array with zeros, 7 days for weels, and 16 rows for schedule times
      scheduleArray = [];
      for (let i = 0; i < 16; i++) {
          scheduleArray.push(new Array(7).fill(0));
      }
    }
  }

  /**
  * Returns schedule array
  * @return scheduleArray, the schedule array
  */
  getScheduleArray() {
    return scheduleArray;
  }

  /**
  * Updates row and column of the array
  * @param row, the row
  * @param col, the column
  * @param value, the value to insert
  */
  updateArray(row, col, value) {
    scheduleArray[row][col] = value;
  }

  /**
  * React componentWillMount function
  * Initializes the array
  */
  componentWillMount() {
    this.initializeArray();
  }

  /**
  * React render function
  */
  render() {
    return (
      <table className="table table-bordered">
        <thead>
          <tr>
            <th className="schedule-grid-header">Mon</th>
            <th className="schedule-grid-header">Tues</th>
            <th className="schedule-grid-header">Wed</th>
            <th className="schedule-grid-header">Thurs</th>
            <th className="schedule-grid-header">Fri</th>
            <th className="schedule-grid-header">Sat</th>
            <th className="schedule-grid-header">Sun</th>
          </tr>
        </thead>
        <tbody>
          {scheduleArray.map((row, rowIndex) => {
              return <tr key={"tr" + rowIndex}>
                {row.map((col, colIndex) => {
                    let hour = rowIndex + 6;
                    let amOrPm = "";
                    if (hour < 12) {
                      amOrPm = "am"
                    } else {
                      amOrPm = "pm"
                    }
                    if (hour > 12) {
                      hour = hour - 12;
                    }
                    return  <ScheduleGridItem key={"grid" + rowIndex + "" + colIndex} selected={scheduleArray[rowIndex][colIndex]} updateArray={this.updateArray.bind(this)} col={colIndex} row={rowIndex} text={hour + " " + amOrPm} />
                  }
                )}
              </tr>
            }
          )}
        </tbody>
      </table>
    );
  }
}
