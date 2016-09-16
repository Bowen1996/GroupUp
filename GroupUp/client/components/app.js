import React, {Component} from 'react';
import Header from './header';
import RaisedButton from 'material-ui/RaisedButton';

//Wrapper, allows you to apply themes to material-ui stuff
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Splash from "./login_components/splash";

export default (props) => {
  return (
    <div>
      <Header />
      {props.children}
    </div>
  );
};
