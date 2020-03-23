import React from 'react';
import {Switch, Route} from 'react-router-dom';

import Authors from '../components/Authors';
import Publishers from '../components/Publishers';
import Books from '../components/Books'


export default class AppBody extends React.Component{

    render() {
      return (
          <Switch>
              <Route path = '/admin/authors'    component = { Authors } />
              <Route path = '/admin/books'      component = { Books}/>
              <Route path = '/admin/genres'     render = {(props) => (<div {...props}>Genres work!</div>)}/>
              <Route path = '/admin/publishers' component = { Publishers } />
              <Route path = '/admin/branches'   render = {(props) => (<div {...props}>Branches work!</div>)}/>
              <Route path = '/admin/borrowers'  render = {(props) => (<div {...props}>Borrowers work!</div>)}/>
          </Switch>
      );}

}