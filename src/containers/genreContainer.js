import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as genreActions from '../store/actions/genreActions'
import {Genres} from '../components/Genres'
import { Target } from '../store/reducers';

const GenreContainer = (props) => {

    return (
        <div>
            <Genres {...props} />
        </div>
    )
}

function mapStateToProps(state) {
    return {
        genres: state[Target.GENRE].genre.genres,
        __paging: state[Target.GENRE].genre.paging.__paging,
        loading: state[Target.GENRE].genre.loading
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(genreActions, dispatch)
    }
}

GenreContainer.propTypes = {
    actions: PropTypes.object
}

export default connect(mapStateToProps, mapDispatchToProps)(GenreContainer);