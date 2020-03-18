import React, { Component } from "react";
import { Button } from "antd";
class Admin extends Component {
  clickButton = text => {
    alert(`Hi, I am a ${text}`);
  };

  render() {
    return (
      <Button type="primary" onClick={() => this.clickButton("Admin")}>
        Do not Click
      </Button>
    );
  }
}

export default Admin;
