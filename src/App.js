import React from "react";
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store'

import "./App.css";

import Header from './containers/Header'
import AppBody from './containers/AppBody'

export default class App extends React.Component {

  render() {
    return (
      <Provider store={store}>
        <HashRouter>
          <Header />
          <AppBody />
        </HashRouter>
      </Provider>
    );
  }

}

