import React, {Component} from 'react';

/**
* Component allowing students to select professor-specified useful skills
*/
export default class SkillSelector extends Component {
  /**
  * Constructor, initializes state
  */
  constructor(props) {
    super(props);
    this.state = {checked: false, proficiency: "1"};
  }

  /** React componentDidMount function
  * Checkboxes class must be initialized, for some reason in
  * the bootstrap material plugin
  */
  componentDidMount() {
    $.material.init()
  }

  /**
  * Gets the proficiency of skill if it is checked
  * @return proficiency of skill stored in state
  */
  getSkill() {
    if (this.state.checked) {
      return this.state.proficiency;
    } else  {
      return null;
    }
  }

  /**
  * Modifies state to check or uncheck skills
  * @param e, the click event
  */
  changeCheck(e) {
    if(e.target.checked) {
      this.refs.radio1.checked = true;
      this.setState({checked: true, proficiency: "1"});
    } else {
      for(let i = 1; i <= 5; i++) {
        this.refs["radio" + i].checked = false;
      }
      this.setState({checked: false, proficiency: "1"});
    }

  }

  /**
  * Upon user clicking radio, updates the state
  * @param e, the click event
  */
  checkRadio(e) {
    if(this.state.checked) {
      this.setState({checked: this.state.checked, proficiency: e.target.value});
    } else {
      e.target.checked = false;
    }
  }

  /**
  * React render
  */
  render() {
    return (
      <div className="row">
        <div className="form-group">
          <div className="col-sm-4">
            <div className="checkbox">
              <label>
                <input onChange={this.changeCheck.bind(this)} type="checkbox" /> {this.props.text}
              </label>
            </div>
          </div>
          <div className="col-sm-8">
            <div className="radio item-inline">
              <label><input onClick={this.checkRadio.bind(this)} type="radio" name={"radio" + this.props.text} value="1" ref="radio1"/>1</label>
            </div>
            <div className="radio item-inline">
              <label><input onClick={this.checkRadio.bind(this)} type="radio" name={"radio" + this.props.text} value="2" ref="radio2"/>2</label>
            </div>
            <div className="radio item-inline">
              <label><input onClick={this.checkRadio.bind(this)} type="radio" name={"radio" + this.props.text} value="3" ref="radio3"/>3</label>
            </div>
            <div className="radio item-inline">
              <label><input onClick={this.checkRadio.bind(this)} type="radio" name={"radio" + this.props.text} value="4" ref="radio4"/>4</label>
            </div>
            <div className="radio item-inline">
              <label><input onClick={this.checkRadio.bind(this)} type="radio" name={"radio" + this.props.text} value="5" ref="radio5"/>5</label>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
