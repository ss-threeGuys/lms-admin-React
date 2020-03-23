import React from 'react';
import {Switch, Route} from 'react-router-dom';

import HocContainer from './HocContainer';
import { Target } from '../store/actions';
import authorMap from '../domains/author.map';
import publisherMap from '../domains/publisher.map';



export default class AppBody extends React.Component{

    render() {
      return (
          <Switch>
              <Route path = '/admin/authors'    component = { HocContainer('Author', Target.AUTHOR, authorMap) } />
              <Route path = '/admin/books'      render = {(props) => (<div {...props}>Books work!</div>)}/>
              <Route path = '/admin/genres'     render ={(props) => (<div {...props}>Genres work!</div>)}/>
              <Route path = '/admin/publishers' component = { HocContainer('Publisher', Target.PUBLISHER, publisherMap) } />
              <Route path = '/admin/branches'   render = {(props) => (<div {...props}>Branches work!</div>)}/>
              <Route path = '/admin/borrowers'  render = {(props) => (<div {...props}>Borrowers work!</div>)}/>
          </Switch>
      );}

}