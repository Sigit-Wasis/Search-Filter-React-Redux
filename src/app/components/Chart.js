import React, { Component } from 'react';
import { connect } from 'react-redux';

class Chart extends Component {
    render() { 
        return (  
            <div>  
                <h5>Grafik Pencarian</h5>
                {/* {this.props.data_pencarian.map((item) =>
                    <li key={item.id} item={item.count}/>
                )} */}
            </div>  
        )  
    }  
}

function mapStateToProps(state) {
    return { 
        data_pencarian: state.data_pencarian
    };
}
  
export default connect(mapStateToProps)(Chart);