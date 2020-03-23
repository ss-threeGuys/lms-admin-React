import React from 'react';
import {Switch, Route} from 'react-router-dom';
import HocContainer from './HocContainer';
import { Target } from '../store/actions';
import authorMap from '../domains/author.map';
import publisherMap from '../domains/publisher.map';
import Authors from '../components/Authors';
import Publishers from '../components/Publishers';
import genreContainer from '../containers/genreContainer'
import borrowerContainer from './borrowerContainer';
import Books from '../components/Books'



export default class AppBody extends React.Component{

    render() {
      return (
          <Switch>

              <Route path = '/admin/authors'    component = { HocContainer('Author', Target.AUTHOR, authorMap) } />
              <Route path = '/admin/books'      component = { Books}/>
              <Route path = '/admin/genres'     component = { genreContainer } />
              <Route path = '/admin/publishers' component = { HocContainer('Publisher', Target.PUBLISHER, publisherMap) } />
              <Route path = '/admin/publishers' component = { Publishers } />
              <Route path = '/admin/branches'   render = {(props) => (<div {...props}>Branches work!</div>)}/>
              <Route path = '/admin/borrowers'  component = { borrowerContainer }/>
          </Switch>
      );}

}