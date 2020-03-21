import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as genreActions from '../store/actions/genreActions'
import {Genres} from '../components/Genres'

const GenreContainer = (props) => {
    // useEffect(() => {
    //     const {actions} = props;
    //     actions.readGenres('name', 1, 1, 10);
    // }, []);

    return (
        <div>
            <Genres {...props} />
        </div>
    )
}

function mapStateToProps(state) {
    return {
        genres: state.genresReducer.genre.genres,
        __paging: state.genresReducer.genre.paging.__paging,
        loading: state.genresReducer.genre.loading
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