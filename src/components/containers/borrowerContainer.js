import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as borrowerActions from "../../actions/borrowerActions";
import { Borrowers } from "../Borrowers";
import { Target } from "../../reducers";

const BorrowerContainer = props => {
  return (
    <div>
      <Borrowers {...props} />
    </div>
  );
};

function mapStateToProps(state) {
  return {
    borrowers: state[Target.BORROWER].borrower.borrowers,
    __paging: state[Target.BORROWER].borrower.paging.__paging,
    loading: state[Target.BORROWER].borrower.loading
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(borrowerActions, dispatch)
  };
}

BorrowerContainer.propTypes = {
  actions: PropTypes.object
};

export default connect(mapStateToProps, mapDispatchToProps)(BorrowerContainer);
