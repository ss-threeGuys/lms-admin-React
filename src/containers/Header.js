import React from 'react';
import Menu from './Menu'

export default class Header extends React.Component{


    constructor(props) {
        super(props);
        this.title = 'LMS';
    }

    render() {
      return (
          <div>
              <div style={{'textAlign': 'center'}}>
                  <h1>Welcome to { this.title }! User: Admin</h1>
              </div>
              <Menu />
          </div>
      );}

}
