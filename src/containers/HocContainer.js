import React from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';


import { Task } from '../store/reducers';
import { connect } from 'react-redux';
import { doTask } from '../store/actions';
import log from '../logger/log';
import HocService from '../services/HocService';


export default (hocName, hocTarget, hocColumnMap) => { 

    class loc extends React.Component{

        static defaultProps = {
                paging: {  
                    first : 0,
                    rows: 10,
                    totalRecords: 0,
                },
                sorting: {   
                    sortField : hocColumnMap[0].field,
                    sortOrder: 1,
                },
                value: null,
                reloadRequired: false,
            };

        constructor(props) {
            super(props);
            
            this.componentName = hocName;
            const serviceClass = HocService(hocName, hocTarget, hocColumnMap);
            this.service = new serviceClass();
            this.target = hocTarget;

            this.defProps = loc.defaultProps;

        

            this.objectPrototype = {};

            for (const col of hocColumnMap) {
                this.objectPrototype[col.field] = col.value?col.value:'';
            }

            this.state = {
                selected: null,
                deleteConfirmed: false,
                input: this.objectPrototype,
            };
        }


        componentDidMount() {

            this.doServiceRetrieve();
        }

        componentDidUpdate(prevProps) {
            log.trace('componentDidUpdate(prevProps)', prevProps, this.props);
            if (this.props.reloadRequired) {
                this.doServiceRetrieve();
            }

        }

    

        onPage(event) {
    
            this.doServiceRetrieve({ 
                paging: {   
                    ...this.props.paging,
                    first : event.first,
                    rows: event.rows
                },
            });

        }

        onSort(event) {

            this.doServiceRetrieve({ 
                sorting: {   
                    sortField : event.sortField,
                    sortOrder: event.sortOrder,
                },
            });

        }

        onRowSelect(event) {
            log.trace('onRowSelect(event)', event);
            this.setState({
                input: {...this.objectPrototype, ...event.data},
                selected: true,
                valid: true,
                displayDialog: true,
                deleteConfirmed: false,
            });
        }
        onAddButtonClick(event) {
            log.trace('onAddButtonClick(event)', event);
            
            this.setState({
                input: this.objectPrototype,
                selected: null,
                valid: false,
                displayDialog: true,
            });
        }

        onSaveButtonClick(event) {
            if (this.state.selected) {
                this.doServiceUpdate(this.state.input);
            } else {
                this.doServiceCreate(this.state.input);
            }
            this.setState({
                input: this.objectPrototype,
                selected: null,
                valid: false,
                displayDialog: false,
            });
        }

        onDeleteButtonClick(event) {
            if (this.state.deleteConfirmed) {
                this.doServiceDelete(this.state.input);
                this.setState({
                    deleteConfirmed: false,
                    displayDialog: false,
                    input: this.objectPrototype,
                    selected: null,
                    valid: false,
                });
            } else {
                this.setState({
                    deleteConfirmed: true,
                    displayDialog: true,
                });
            }

        }
        onCancelButtonClick(event) {
            log.trace('onCancelButtonClick(event)', event);
            
            this.setState({
                input: this.objectPrototype,
                selected: null,
                valid: false,
                displayDialog: false,
                deleteConfirmed: false,
            });
        }
        onKeyUp(event) {
            log.trace('onKeyUp(event)', event.target.id, event.target.value, this.state.input);

            event.target.value = event.target.value.trimStart();

            for (const col of hocColumnMap) {
                if (col.field === event.target.id && col.validators) {
                    for (const validator of col.validators) {
                        if (!validator(event.target.value)) {
                            this.setState({valid: false});
                            return;
                        }
                    }
                }
            }
            
    
            this.setState({
                input: {...this.state.input, [event.target.id]: event.target.value.trimStart()},
                valid: true,
            });
        }

        doServiceRetrieve(newProps = {}) {
            const props = {...this.defProps, ...this.props, ...newProps}
            const currentPage = 1 + ( props.paging.first / props.paging.rows)
            this.service.retrieve( 
                    props.sorting.sortField, 
                    props.sorting.sortOrder,                 
                    currentPage, 
                    props.paging.rows);
        };

        doServiceCreate(newObject) {
            this.service.create(newObject);
        }

        doServiceUpdate(updatedObject) {
            this.service.update(updatedObject);
        }

        doServiceDelete(deleteObject) {
            this.service.delete(deleteObject);
        }

        renderColumn() {
            let cols = [];
            for (const col of hocColumnMap) {
                cols.push(
                    <Column key={col.field} field={col.field} header={col.header} sortable={true} />
                );
            }
            
            return cols;
        };

        renderFormInput() {
            let inputs = [];
            for (const col of hocColumnMap) {
                inputs.push(
                    <div key={'d_input_'+col.field}>
                        <div className="p-col-4" style={{ padding: '.75em' }}>
                            <label htmlFor={col.field}>{col.header}</label>
                        </div>
                        <div className="p-col-8" style={{ padding: '.5em' }}>
                            <InputText key={'input_'+col.field} 
                                id={col.field} 
                                onKeyUp={this.onKeyUp.bind(this)}
                                defaultValue={this.state.input[col.field]} />
                        </div>
                    </div>
                );
            }
            
            return inputs;
        }

        renderForm() {
            let footer = (
                <div className="ui-dialog-buttonpane p-clearfix">
                
                <Button label='Cancel' icon="pi pi-ban" onClick={this.onCancelButtonClick.bind(this)}/>
    

                { (this.state.selected) ? 
                    <Button label={this.state.deleteConfirmed?'Confirm Delete':'Delete'} icon="pi pi-times" onClick={this.onDeleteButtonClick.bind(this)}/>
                : null }

                { (!this.state.deleteConfirmed) ?
                <Button disabled={!this.state.valid} 
                    label={(this.state.selected)?'Update':'Create'}
                    icon="pi pi-check" 
                    onClick={this.onSaveButtonClick.bind(this)} />
                : null }


                </div>
            ); 

            return (
                <Dialog ref={(el) => this.form = el}
                    header={this.componentName + ' Details'}
                    visible={this.state.displayDialog} 
                    modal={true}
                    style={{ width: '80%', minWidth: '500px', maxWidth: '800px' }} 
                    
                    footer={footer} 
                    onHide={() => this.setState({ displayDialog: false })} >

                    <div className="p-grid p-fluid">
                    {this.renderFormInput()}
                    </div>
                </Dialog>
        );
        } 

        render() {
            let header = 
                <div className="p-clearfix" style={{ lineHeight: '1.87em' }}>
                    { this.componentName }
                </div>
            ;

            let footer = 
                <div className="p-clearfix" style={{ width: '100%' }}>
                    <Button style={{ float: 'left' }} label="Add" icon="pi pi-plus" 
                    onClick={this.onAddButtonClick.bind(this)} />
                </div>
            ;

            return ( 
            
                <div>
                    <DataTable ref={(el) => this.dt = el}
                        paging={{first:0}}
                        value={this.props.value} 
                    
                        header={header} 
                        footer={footer}
                        selectionMode="single" selection={this.state.selected} 
                        onSelectionChange={e => this.setState({ selected: e.value })}
                        onRowSelect={this.onRowSelect.bind(this)}

                        lazy={true} 
                        loading={this.props.loading}

                        paginator={true} 
                        onPage={this.onPage.bind(this)} 
                        first={this.props.paging?.first || this.defProps.paging.first}
                        rows={this.props.paging?.rows || this.defProps.paging.rows}
                        totalRecords={this.props.paging?.totalRecords || this.defProps.paging.totalRecords} 
            
                        onSort={this.onSort.bind(this)} 
                        sortField={this.props.sorting?.sortField || this.defProps.sorting.sortField}
                        sortOrder={Number(this.props.sorting?.sortOrder || this.defProps.sorting.sortOrder)}
                        
                        >
                        
                        {this.renderColumn()}

                    </DataTable>

                    {this.renderForm()}
                </div>

            );
        
        }

        

    }

    function mapStateToProps(state, props)  {
        log.trace('mapStateToProps(state, props) ', state, props);
        let newProps = {...props, ...state[hocTarget].props};
        return newProps;
    }

    function mapDispatchToProp(dispatch, props) {
        return {
            set: (newProps) => {dispatch(doTask(hocTarget, Task.SETPROPS)(newProps));}
        };
    }

    return connect(mapStateToProps, mapDispatchToProp)(loc)

}