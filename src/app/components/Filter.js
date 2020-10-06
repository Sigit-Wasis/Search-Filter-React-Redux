import React, { Component, Fragment } from 'react';
import Search from './Search';
import {Bar} from 'react-chartjs-2';
// import Chart from './Chart';
import axios from 'axios';
import { connect } from 'react-redux';

class Filter extends Component {
    constructor(props) {
        super(props);

        /* state ini berisi data yang tidak diimport ke komponen lain
        hanya menampung data dari lokasi hasil fetching data API */
        this.state = {
            HasilPencarian: []
        }
    }
   
    /* Fungsi yang digunakan untuk mengambil data dari API untuk ditampilkan ke dalam chart 
       aksi ini diambil dari onClick pada button Cari */
    getDataSearch = () => {
        // console.log(this.props.dataFilter);

        /* Mengambil data dari Initial State melalui mapsStateToProps */
        const tanggal_mulai = this.props.dataFilter.tanggal_mulai;
        const tanggal_akhir = this.props.dataFilter.tanggal_akhir;
        const id_provinsi = this.props.dataFilter.id_provinsi;
        const id_kabupaten = this.props.dataFilter.id_kabupaten;
        const id_kecamatan = this.props.dataFilter.id_kecamatan;
        const id_kelurahan = this.props.dataFilter.id_kelurahan;

        if(tanggal_mulai && tanggal_akhir !== '') {
            axios.get(
                `http://sakapi.microdataindonesia.co.id/surat-izin-usaha-mikro/statistik`,
                {
                    params: {
                        from_date: tanggal_mulai,
                        to_date: tanggal_akhir,
                        provinsi: id_provinsi,
                        kabupaten: id_kabupaten,
                        kecamatan: id_kecamatan,
                        kelurahan: id_kelurahan,
                    }
                }
            ).then(response => {
                // this.setState({HasilPencarian: response.data});
                // console.log(this.state.HasilPencarian)
                // this.props.dispatch({
                //     type: 'HASIL_PENCARIAN',
                //     payload: response.data
                // });
                const football = response.data;
                let playername = [];
                let playerscore = [];
                football.forEach(element => {
                    playername.push(element.date);
                    playerscore.push(element.count);
                });
                this.setState({ 
                    HasilPencarian: {
                    labels: playername,
                    datasets:[
                        {
                            label:'Grafi Surat Izin Usah Mikro',
                            data: playerscore ,
                            backgroundColor:[
                            'rgba(255,105,145,0.6)',
                            'rgba(155,100,210,0.6)',
                            'rgba(90,178,255,0.6)',
                            'rgba(240,134,67,0.6)',
                            'rgba(120,120,120,0.6)',
                            'rgba(250,55,197,0.6)'
                        ]
                        }
                    ]
                }
                });
            })
            .catch(error => {
                console.warn(error);
            });
        } else {
            alert('Tanggal Mulai dan Tanggal Akhir harus Diisi!');
        }
    }

    render() {
        return (
            <Fragment>
                <div className="body">
                    <div className="card">
                        <Search />
                        <button className="btn btn-primary btn-sm" onClick={this.getDataSearch}>Cari</button>
                        <br/>
                        <Bar
          data={this.state.HasilPencarian}/>
                        {/* <Chart /> */}
                    </div>
                </div>
            </Fragment>
        )
    }
}

/* memanggil data dari store redux pada reactjs dan menghubungkannya ke komponen bisa kita lakukan dengan 
   bantuan mapStateToProps dari package react-redux. Isi dari state adalah data yang ada pada Initial State */
function mapStateToProps(state) {
    return { dataFilter: state };
}

export default connect(mapStateToProps)(Filter); 