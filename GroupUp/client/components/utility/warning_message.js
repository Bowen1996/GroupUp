import React, {Component} from 'react';

/**
* State-based warning message
*/
export default class WarningMessage extends Component {
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
    return (
      <div className="alert alert-dismissible alert-danger">
        {this.props.message}
      </div>
    );
  }
}
