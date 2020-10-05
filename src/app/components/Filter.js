import React, { Component, Fragment } from 'react';
// import component search
import Search from './Search';
// import component search
// import Chart from './Chart';
// import connect from react-redux
import {connect} from 'react-redux';

class Filter extends Component {

    render() {
        return (
            <Fragment>
                <Search />
                {/* <Chart /> */}
            </Fragment>
        )
    }
}

function mapStateToProps(state) {
    return {count: state.count};
}

export default connect(mapStateToProps)(Filter); 