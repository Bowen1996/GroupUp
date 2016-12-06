import React, { Component } from 'react';

/**
* Component to display each student in a ManuallyGroupStudentGroupsPanel item
*/
export default class ManuallyGroupStudentItem extends Component {
  /**
   * Constructor, initializes state
   */
  constructor(props) {
    super(props);
  }

  /**
   * React componentDidMount function
   * Sets the initial CSS class of each item
   */
  componentWillMount() {
    this.setState({ classes: "list-group-orig-item" });
  }

  /**
  * Toggles highlight when an item is selected
  */
  handleSelect() {
    if (this.state.classes == "list-group-orig-item") {
      this.setState({ classes: "list-group-orig-item active" });
    } else {
      this.setState({ classes: "list-group-orig-item" });
    }
  }

  /**
  * React render function
  */
  render() {
    return(
      <a
        className={this.state.classes}
        onClick={this.handleSelect.bind(this)}>
        {this.props.email}
      </a>
    );
  }
};
