import React from "react";
import { TabMenu } from "primereact/tabmenu";

export default class Menu extends React.Component {
  constructor(props) {
    super();
    const baseRoute = "admin/";
    this.props = props;
    this.state = {
      items: [
        { label: "Author", routerLink: [`${baseRoute}authors`] },
        { label: "Book", routerLink: [`${baseRoute}books`] },
        { label: "Genre", routerLink: [`${baseRoute}genres`] },
        { label: "Publisher", routerLink: [`${baseRoute}publishers`] },
        { label: "Branch", routerLink: [`${baseRoute}branches`] },
        { label: "Borrower", routerLink: [`${baseRoute}borrowers`] }
      ]
    };

    for (const item of this.state.items) {
      if (window.location.hash.replace(/^#\//, "") === item.routerLink[0]) {
        this.state.activeItem = item;
        break;
      }
    }
  }

  onTabChange(event) {
    this.setState({ activeItem: event.value });
    window.location.hash = event.value.routerLink;
  }

  render() {
    return (
      <div>
        <TabMenu
          model={this.state.items}
          activeItem={this.state.activeItem}
          onTabChange={e => this.onTabChange(e)}
        />
      </div>
    );
  }
}
