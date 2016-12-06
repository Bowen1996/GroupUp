import React, {Component} from 'react';

/**
* List of skills for the create project form
*/
export default class SkillsList extends Component {
  /**
   * Constructor, initializes state
   */
  constructor(props) {
    super(props);
  }

  /**
  * Map through skills that are passed in as props
  * @return the mapped skill data
  */
  renderSkills() {
    return this.props.skills.map(skill => {
      return (
          <div key={skill.id} className="alert alert-dismissible alert-primary">
              <button
                onClick={(e) => {
                    e.preventDefault();
                    this.props.removeSkill(skill.id);
                }}
                className="close">
                x
              </button>
              {skill.text}
            </div>
      );
    });
  }

  /**
  * React render function
  */
  render() {
    return (
      <div>
          {this.renderSkills()}
      </div>
    );
  }
}
