import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as borrowerActions from '../store/actions/borrowerActions'
import {Borrowers} from '../components/Borrowers'

const BorrowerContainer = (props) => {
    // useEffect(() => {
    //     const {actions} = props;
    //     actions.readBorrowers('name', 1, 1, 10);
    // }, []);

    return (
        <div>
            <Borrowers {...props} />
        </div>
    )
}

function mapStateToProps(state) {
    return {
        borrowers: state.borrowersReducer.borrower.borrowers,
        __paging: state.borrowersReducer.borrower.paging.__paging,
        loading: state.borrowersReducer.borrower.loading
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(borrowerActions, dispatch)
    }
}

BorrowerContainer.propTypes = {
    actions: PropTypes.object
}

export default connect(mapStateToProps, mapDispatchToProps)(BorrowerContainer);