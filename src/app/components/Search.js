import React, { Component } from 'react';               // import component react
import axios from 'axios';                              // import axios 
import DatePicker from "react-datepicker";              // import datepicker
import 'bootstrap/dist/css/bootstrap.min.css';          // import style dari bootstrap
import "react-datepicker/dist/react-datepicker.css";    // import style dari datepicker
import {connect} from 'react-redux';                    // import untuk menghubungkan dengan redux

/* ===========================================================================
   ** FORMAT TANGGAL **

   ** jika kita console.log maka getMonth() = 9 maka itu ditambah 1 menjadi 10
   ** karena getMonth() januari di mulai dari index 0 dan October di index 9.

   ** kemudian jika penjang karakter month dan day kurang dari 2 maka ditambah
      angka 0 didepan maka menjadi 06 atau 07 dll.
   ** dan dikembalikan dalam bentuk 2020-10-06 sesuai tanggal yang dipilih.
=========================================================================== */ 
function formatDate(date) {
    var d = new Date(date),    
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}

class Search extends Component {
    constructor(props) {
        super(props);

        /* state ini berisi data yang tidak diimport ke komponen lain
        hanya menampung data dari lokasi hasil fetching data API */
        this.state = {
            StartDate: new Date(),
            EndDate: new Date(),
            ProvinsiData: [],
            KabupatenData: [],
            KecamatanData: [],
            KelurahanData: [],
            NamaPemohon: []
        }
    }

    /* Method yang akan di load pertama kali dengan mengambil data provinsi */
    componentDidMount() {
        axios.get(`http://sakapi.microdataindonesia.co.id/wilayah/provinsi`)
        .then(response => {
            this.setState({ProvinsiData: response.data});
        })
        .catch(error => {
            console.warn(error);
        });
    }

    /* Method akan mengambil data kabupaten setelah mendapatkan id provinsi */
    ChangeKabupaten = (e) => {  
        /* Action dibawah ini mengirimkan value ke dalam Initial State yang ada di App.js */
        this.props.dispatch({  
            type: 'ID_PROVINSI',        // type dari reducer
            payload: e.target.value     // value dari form input
        });

        axios.get('http://sakapi.microdataindonesia.co.id/wilayah/kabupaten/' + e.target.value )
        .then((response) => {  
            // console.log(response.data);
            this.setState({KabupatenData: response.data});
        })
        .catch(error => {
            console.warn(error);
        });  
    }      
    
    /* Method akan mengambil data kecamatan setelah mendapatkan id kabupaten */
    ChangeKecamatan = (e) => {  
        /* Action dibawah ini mengirimkan value ke dalam Initial State yang ada di App.js */
        this.props.dispatch({  
            type: 'ID_KABUPATEN',       // type dari reducer
            payload: e.target.value     // value dari form input
        });

        axios.get('http://sakapi.microdataindonesia.co.id/wilayah/kecamatan/' + e.target.value)
        .then(response => {   
            // console.log(response.data);
            this.setState({KecamatanData: response.data});
        })
        .catch(error => {
            console.warn(error);
        });  
    }  

    /* Method akan mengambil data kelurahan setelah mendapatkan id kecamatan */
    ChangeKelurahan = (e) => {  
        /* Action dibawah ini mengirimkan value ke dalam Initial State yang ada di App.js */
        this.props.dispatch({  
            type: 'ID_KECAMATAN',       // type dari reducer
            payload: e.target.value     // value dari form input
        });

        axios.get('http://sakapi.microdataindonesia.co.id/wilayah/kelurahan/' + e.target.value)
        .then(response => {  
            // console.log(response.data);
            this.setState({KelurahanData: response.data});
        })
        .catch(error => {
            console.warn(error);
        }); 
    }  

    /* method untuk mengambil data dari form input Nama Pemohon */
    setNamaPemohon = (p) => {
        /* Action dibawah ini mengirimkan value ke dalam Initial State yang ada di App.js */
        this.props.dispatch({
            type: 'ID_NAMAPEMOHON',     // type dari reducer
            payload: p                  // parameter dari form input
        });
    }

    /* method untuk mengambil data dari form input Tanggal Mulai */
    setStartDate = (p) => {
        // console.log(p);
        // console.log(formatDate(p));

        /* mengirimkan value ke dalam State yang ada di Search.js */
        this.setState({StartDate: p});

        /* Action dibawah ini mengirimkan value ke dalam Initial State yang ada di App.js */
        this.props.dispatch({
            type: 'TANGGAL_MULAI',      // type dari reducer
            payload: formatDate(p)      // parameter dari form input
        });
    }

    /* method untuk mengambil data dari form input Tanggal Akhir */
    setEndDate = (p) => {
        /* mengirimkan value ke dalam State yang ada di Search.js */
        this.setState({EndDate: p});

        /* Action dibawah ini mengirimkan value ke dalam Initial State yang ada di App.js */
        this.props.dispatch({
            type: 'TANGGAL_AKHIR',      // type dari reducer
            payload: formatDate(p)      // parameter dari form input
        });
    }

    /* Merender semua tag HTML yang dibuat untuk ditampilkan di index.html */
    render() {
        return ( 
            <div className="container">
                <div className="form-row">
                    <div className="form-group col-md-3">
                        <label>Tanggal Mulai</label>
                        <DatePicker
                            className="form-control tm"
                            dateFormat="yyyy-MM-dd"
                            selected={this.state.StartDate}
                            onChange={date => this.setStartDate(date)}
                            placeholderText="yyyy-mm-dd"
                        />
                    </div>
                    <div className="form-group col-md-3">
                        <label>Tanggal Akhir</label>
                        <DatePicker
                            className="form-control ta"
                            dateFormat="yyyy-MM-dd"
                            selected={this.state.EndDate}
                            onChange={date => this.setEndDate(date)}
                            placeholderText="yyyy-mm-dd"
                        />
                    </div>

                    <div className="form-group col-md-3">
                        <label>Provinsi</label>
                        <select className="form-control" name="provinsi" onChange={this.ChangeKabupaten}>  
                            <option>Pilih Provinsi</option>  
                            {this.state.ProvinsiData.map((e, key) => {  
                                return <option key={key} value={e.id}>{e.instansi}</option>;  
                            })}  
                        </select> 
                    </div>
                    <div className="form-group col-md-3">
                        <label>Kabupaten</label>
                        <select className="form-control slkb" name="kabupaten" disabled={this.state.KabupatenData.length < 1} onChange={this.ChangeKecamatan}>  
                            <option>Pilih Kabupaten</option>    
                                {this.state.KabupatenData.map((e, key) => {  
                                    return <option key={key} value={e.id}>{e.instansi}</option>;  
                                })}  
                        </select> 
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group col-md-6">
                        <label>Nama Pemohon</label>
                        <input type="text" className="form-control" onChange={this.setNamaPemohon}/>
                    </div>

                    <div className="form-group col-md-3">
                        <label>Kecamatan</label>
                        <select className="form-control slkc" name="kecamatan" disabled={this.state.KecamatanData.length < 1} onChange={this.ChangeKelurahan}>  
                            <option>Pilih Kecamatan</option>    
                                {this.state.KecamatanData.map((e, key) => {  
                                    return <option key={key} value={e.id}>{e.instansi}</option>;  
                                })}  
                        </select>
                    </div>
                    <div className="form-group col-md-3">
                        <label>Kelurahan</label>
                        <select className="form-control slkl" name="kelurahan" disabled={this.state.KelurahanData.length < 1}>  
                            <option>Pilih Kelurahan</option>    
                                {this.state.KelurahanData.map((e, key) => {  
                                    return <option key={key} value={e.id}>{e.instansi}</option>;  
                                })}  
                        </select>
                    </div>
                </div>
            </div>
        )
    }
}

/* memanggil data dari store redux pada reactjs dan menghubungkannya ke komponen bisa kita lakukan dengan 
   bantuan mapStateToProps dari package react-redux. Isi dari state adalah data yang ada pada Initial State */
function mapStateToProps(state) {
    return {datapencarian: state}
}

export default connect(mapStateToProps)(Search);