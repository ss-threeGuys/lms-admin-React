import React from "react";
import { HashRouter } from "react-router-dom";
import "./App.css";
import Header from "./components/containers/Header";
import AppBody from "./components/containers/AppBody";

export default class App extends React.Component {
  render() {
    return (
      <HashRouter>
        <Header />
        <AppBody />
      </HashRouter>
    );
  }
}
