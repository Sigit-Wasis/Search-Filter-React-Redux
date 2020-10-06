import React, { Component, Fragment } from 'react';
import Search from './Search';
import Chart from './Chart';
import axios from 'axios';
import { connect } from 'react-redux';

class Filter extends Component {
   
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
                this.props.dispatch({
                    type: 'HASIL_PENCARIAN',
                    payload: response.data
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
                        <br/><br/>
                        <Chart />
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