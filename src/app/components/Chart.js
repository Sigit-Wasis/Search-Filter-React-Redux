import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Bar} from 'react-chartjs-2';

class Chart extends Component {

    render() { 
        console.log(this.props.data_pencarian)
        let dataPencarian = this.props.data_pencarian;    // semua data dari hasil pencarian

        console.log(dataPencarian);

        let dateSearch = [];                    // data date dari pencarian
        let countSearch = [];                   // data count dari pencarian

        console.log(countSearch)

        // looping data masukkan sesuai dengan date dan count
        dataPencarian.forEach(element => {
            dateSearch.push(element.date);
            countSearch.push(element.count);
        });

        let datacari = {
            labels: dateSearch,
            datasets:[
                {
                    label:'Grafik Surat Izin Usah Mikro',
                    data: countSearch,
                    backgroundColor:[
                    'rgba(255,105,145,0.6)',
                    'rgba(155,100,210,0.6)',
                    'rgba(90,178,255,0.6)',
                    'rgba(240,134,67,0.6)',
                    'rgba(120,120,120,0.6)',
                    'rgba(250,55,197,0.6)'
                ]
                }
            ],
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        }

        return (  
            <div>  
            <h5>Grafik Pencarian</h5>
            <Bar
                data={datacari}
                width={100}
                height={50}
                />
        </div>  
        )  
    }  
}

function mapStateToProps(state) {
    console.log(state)
    return { 
        data_pencarian: state.data_pencarian
    };
}
  
export default connect(mapStateToProps)(Chart);