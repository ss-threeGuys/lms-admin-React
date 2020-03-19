import React from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';

import columnMap from '../domains/publisher/publisher.map'

export default class Publishers extends React.Component{


    constructor(props) {
        super(props);
        this.componentName = 'Publishers'
        this.state = {
            data: [
                {name:'vinnn01', address: '201 2 St', phone: '555-6789'},
                {name:'vinnn02', address: '202 1 St', phone: '555-6790'},
                {name:'vinnn03', address: '201 2 St', phone: '555-6789'},
                {name:'vinnn04', address: '202 1 St', phone: '555-6790'},
                {name:'vinnn05', address: '201 2 St', phone: '555-6789'},
                {name:'vinnn06', address: '202 1 St', phone: '555-6790'},
                {name:'vinnn07', address: '201 2 St', phone: '555-6789'},
                {name:'vinnn08', address: '202 1 St', phone: '555-6790'},
                {name:'vinnn09', address: '201 2 St', phone: '555-6789'},
                {name:'vinnn10', address: '202 1 St', phone: '555-6790'},
            ],
            selected: null,
            loading: false,
            totalRecords: 100,
        };
    }


    onRowSelect(event) {
        console.log(event);
    }

    onPage(event) {
        console.log(event);
        this.setState({loading: true});
    }

    onModelFilterChange(event) {
        console.log(event);
    }

    renderColumn() {
        let cols = [];
        for (const col of columnMap) {
            cols.push(<Column field={col.field} header={col.header} sortable={true} />);
        }
        return cols;
    };

    render() {

        let header = 
    <div className="p-clearfix" style={{ lineHeight: '1.87em' }}>{ this.componentName }</div>;

        let footer = 
            <div className="p-clearfix" style={{ width: '100%' }}>
                <Button style={{ float: 'left' }} label="Add" icon="pi pi-plus" 
                onClick={this.addNew} />
            </div>;


        return ( 
            <div>
                <DataTable ref={(el) => this.dt = el}
                    value={this.state.data} 
                    paginator={true} 
                    rows={5}
                    totalRecords={this.state.totalRecords} 
                    header={header} 
                    footer={footer}
                    selectionMode="single" selection={this.state.selected} 
                    onSelectionChange={e => this.setState({ selected: e.value })}
                    onRowSelect={this.onRowSelect.bind(this)}
                    lazy={true} 
                    onPage={this.onPage.bind(this)} 
                    loading={this.state.loading} 
                    >
                    {this.renderColumn()}
                </DataTable>
            </div>
        );
    
    }

}