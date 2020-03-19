import React from "react";
import {HashRouter} from 'react-router-dom';

import "./App.css";

import Header from './containers/Header'
import AppBody from './containers/AppBody'

export default class App extends React.Component{

    render() {
      return (
        <HashRouter>
          <Header />
          <AppBody />
        </HashRouter>
      );}

}

