import React from 'react';
import { TabMenu } from 'primereact/tabmenu';

export default class Menu extends React.Component{

    constructor(props) {
        super();
        const baseRoute = "admin/";
        this.props = props;
        this.state = {
            items:   [
                { label: "Author", routerLink: [`${baseRoute}authors`] },
                { label: "Book", routerLink: [`${baseRoute}books`] },
                { label: "Genre", routerLink: [`${baseRoute}genres`] },
                { label: "Publisher", routerLink: [`${baseRoute}publishers`] },
                { label: "Branch", routerLink: [`${baseRoute}branches`] },
                { label: "Borrower", routerLink: [`${baseRoute}borrowers`] }
              ]
        };
    }
    
    onTabChange(event) {
        this.setState({activeItem: event.value});
        window.location.hash = event.value.routerLink;
    }

    render() {

      return (
          <div>
            <TabMenu 
                model={this.state.items} 
                activeItem={this.state.activeItem} 
                onTabChange={(e) => this.onTabChange(e)} 
            />
          </div>
      );
    
    }

}
