import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';

import App from './components/app';
import Splash from './components/login/splash';
import Registration from './components/login/registration';
import ConfirmationAccount from './components/utility/confirmation_account';
import ConfirmationAccountStudent from './components/utility/confirmation_account_student';
import ConfirmationCreateProject from './components/utility/confirmation_create_project';
import CreateProjectForm from './components/professor/create_project_form';
import ProfessorDashboard from './components/professor/professor_dashboard';
import ProjectDashboard from './components/professor/project_dashboard/project_dashboard';
import ManuallyGroupStudents from './components/professor/manually-group/manually_group_page';
import MyGroup from './components/student/my_group_page';
import CreateNewGroup from './components/student/create_new_group';
import StudentDashboard from './components/student/student_dashboard';
import AboutMeForm from './components/student/about_me/about_me_form';
import CurrentGroups from './components/student/current_groups';

const routes = (
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Splash} />

      {/*Professor Routes*/}
      <Route path="registration/:userType" component={Registration} />
      <Route path="confirmation-account" component={ConfirmationAccount} />
      <Route path="confirmation-create-project" component={ConfirmationCreateProject} />
      <Route path="confirmation-account-student" component={ConfirmationAccountStudent} />
      <Route path="create-project/:projectId" component={CreateProjectForm} />
      <Route path="professor-dashboard" component={ProfessorDashboard} />
      <Route path="project-dashboard/:projectId" component={ProjectDashboard} />
      <Route path="manually-group-students/:projectId" component={ManuallyGroupStudents} />

      {/*Student Routes*/}
      <Route path="student-dashboard" component={StudentDashboard} />
      <Route path="about-me/:projectId" component={AboutMeForm} />
      <Route path="my-group/:projectId" component={MyGroup} />
      <Route path="create-new-group/:projectId" component={CreateNewGroup} />
      <Route path="current-groups/:projectId" component={CurrentGroups} />
    </Route>

    {/*Routes Using Professor Project URL*/}
    <Route path="/:projectId" component={App}>
      <IndexRoute component={Splash} />
      <Route path="registration/:userType" component={Registration} />
    </Route>
  </Router>

);

Meteor.startup(() => {
  ReactDOM.render(routes, document.querySelector('.render-target'));
});
