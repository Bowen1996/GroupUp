import React, {Component} from 'react';
import Header from './header';

import Splash from "./login_components/splash";

export default (props) => {
  return (
    <div>
      <Header />
      <div className="background-default">
        {props.children}
      </div>
    </div>
  );
};
