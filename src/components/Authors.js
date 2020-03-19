import React from 'react';


export default class Publishers extends React.Component{


    constructor(props) {
        super(props);
        this.componentName = 'Authors'
    }

    render() {
      return (
        <div>{this.componentName}</div>
      );}

}