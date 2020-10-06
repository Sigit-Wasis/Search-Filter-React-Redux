import React, { Component } from 'react';
import { connect } from 'react-redux';

class Chart extends Component {
    
    render() {  
        var hasil = this.props.data_pencarian;
    
        console.log(hasil)
        return (  
            <div>  
                <h5>Grafik Pencarian</h5>
            </div>  
        )  
    }  
}

function mapStateToProps(state) {
    return { data_pencarian: state.data_pencarian };
}
  
export default connect(mapStateToProps)(Chart);