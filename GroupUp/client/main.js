import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';

import App from './components/app';
import Splash from './components/login_components/splash';
import Registration from './components/login_components/registration';
import ConfirmationAccount from './components/utility_components/confirmation_account';
import ConfirmationCreateProject from './components/utility_components/confirmation_create_project';
import CreateProjectForm from './components/professor_components/create_project_form';
import ProfessorDashboard from './components/professor_components/professor_dashboard';

const routes = (
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Splash} />
      <Route path="registration/:userType" component={Registration} />
      <Route path="confirmation-account" component={ConfirmationAccount} />
      <Route path="confirmation-create-project" component={ConfirmationCreateProject} />
      <Route path="create-project" component={CreateProjectForm} />
      <Route path="professor-dashboard" component={ProfessorDashboard} />
    </Route>
  </Router>
);

Meteor.startup(() => {
  ReactDOM.render(routes, document.querySelector('.render-target'));
});
