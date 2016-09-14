import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import injectTapEventPlugin from 'react-tap-event-plugin';

import App from './components/app';

const routes = (
  <Router history={browserHistory}>
    <Route path="/" component={App}>
    </Route>
  </Router>
);

Meteor.startup(() => {
  injectTapEventPlugin();
  ReactDOM.render(routes, document.querySelector('.render-target'));
});
