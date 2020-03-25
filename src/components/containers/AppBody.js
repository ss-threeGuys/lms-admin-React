import React from "react";
import { Switch, Route } from "react-router-dom";
import HocContainer from "./HocContainer";
import { Target } from "../../actions";
import authorMap from "../../domains/author.map";
import publisherMap from "../../domains/publisher.map";
import genreContainer from "./genreContainer";
import borrowerContainer from "./borrowerContainer";
import Books from "../Books";
import BranchTable from "../BranchTable/BranchTable";

export default class AppBody extends React.Component {
  render() {
    return (
      <Switch>
        <Route
          path="/admin/authors"
          component={HocContainer("Author", Target.AUTHOR, authorMap)}
        />
        <Route path="/admin/books" component={Books} />
        <Route path="/admin/genres" component={genreContainer} />
        <Route
          path="/admin/publishers"
          component={HocContainer("Publisher", Target.PUBLISHER, publisherMap)}
        />
        <Route path="/admin/branches" component={BranchTable} />
        <Route path="/admin/borrowers" component={borrowerContainer} />
      </Switch>
    );
  }
}
