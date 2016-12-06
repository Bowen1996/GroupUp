import React, {Component} from 'react';

const CLASS_NAME = "schedule-grid-item";
const CLASS_NAME_SELECTED = "schedule-grid-item-selected";

/**
* Grid item in the schedule picker widget
*/
export default class SchedulePicker extends Component {
  /**
  * Constructor, initializes state
  */
  constructor(props) {
    super(props);
    if (this.props.selected) {
      this.state = {gridClass: CLASS_NAME_SELECTED}
    } else {
      this.state = {gridClass: CLASS_NAME}
    }
  }

  /**
  * Click an item in the widget
  */
  gridClick() {
    this.toggleSelected();
  }

  /**
  * Drag across the widget
  */
  gridDrag(e) {
    if (e.buttons > 0) { //If a mouse button is pressed
      this.toggleSelected();
    }
  }

  /**
  * If the item is on, toggle off, and vice versa
  */
  toggleSelected() {
    if (this.state.gridClass === CLASS_NAME) {
      this.setState({gridClass: CLASS_NAME_SELECTED});
      this.props.updateArray(this.props.row, this.props.col, 1);
    } else {
      this.setState({gridClass: CLASS_NAME});
      this.props.updateArray(this.props.row, this.props.col, 0);
    }
  }

  /**
  * React render function
  */
  render() {
    return (
      <td onClick={this.gridClick.bind(this)} onMouseOver={this.gridDrag.bind(this)} className={this.state.gridClass}>{this.props.text}</td>
    );
  }
}
