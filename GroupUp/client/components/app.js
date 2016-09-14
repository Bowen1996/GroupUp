import React, {Component} from 'react';
import Header from './header';
import RaisedButton from 'material-ui/RaisedButton';

//Wrapper, allows you to apply themes to material-ui stuff
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

export default (props) => {
  return (
    <div>
      <Header />
      <p className="bg-success">The app is working!</p>
      <MuiThemeProvider>
        <RaisedButton label="This is a button. It uses material design!" />
      </MuiThemeProvider>
    </div>
  );
};
