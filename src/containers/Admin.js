import React, { Component } from "react";

class Admin extends Component {
  clickButton = text => {
    alert(`Hi, I am a ${text}`);
  };

  render() {
    return (
      <button onClick={() => this.clickButton("Admin")}> Do not Click </button>
    );
  }
}

export default Admin;
