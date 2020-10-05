import React, { Component, Fragment } from 'react';
// import component search
import Search from './Search';
// import axios
// import connect from react-redux
import {connect} from 'react-redux';
import { getDataSearch } from './getDataSearch';

class Filter extends Component {

    render() {
        return (
            <Fragment>
                <Search />
                <button className="btn btn-primary btn-sm float-right" onClick={getDataSearch}>Cari</button>
            </Fragment>
        )
    }
}

function mapStateToProps(state) {
    return {dataFilter: state};
}

export default connect(mapStateToProps)(Filter); 