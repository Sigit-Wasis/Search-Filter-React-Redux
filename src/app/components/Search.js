import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from "react-datepicker";
import 'bootstrap/dist/css/bootstrap.min.css';

import "react-datepicker/dist/react-datepicker.css";
// import connect from react-redux
import {connect} from 'react-redux';

class Search extends Component {
    constructor(props) {
        super(props);

        this.state = {
            startDate: null,
            endDate: null,
            ProvinsiId: '',
            KabupatenId: '',
            KecamatanId: '',
            KelurahanId: '',
            ProvinsiData: [],
            KabupatenData: [],
            KecamatanData: [],
            KelurahanData: [],
            NamaPemohon: []
        };

        // binding react js
        this.setStartDate = this.setStartDate.bind(this);
        this.setEndDate = this.setEndDate.bind(this);
        this.setNamaPemohon = this.setNamaPemohon.bind(this);
    }

    componentDidMount() {
        axios.get(`http://sakapi.microdataindonesia.co.id/wilayah/provinsi`)
        .then(response => {
            this.setState({
                ProvinsiData: response.data
            });
        })
        .catch(error => {
            console.warn(error);
        });
    }

    ChangeKabupaten = (e) => {  
        this.setState({ ProvinsiId: e.target.value });  
        axios.get('http://sakapi.microdataindonesia.co.id/wilayah/kabupaten/' + e.target.value )
        .then((response) => {  
            console.log(response.data)
            this.setState({  
                KabupatenData: response.data,  
            });  
        })
        .catch(error => {
            console.warn(error);
        });  
    }      
    
    ChangeKecamatan = (e) => {  
        this.setState({ KabupatenId: e.target.value });  
        axios.get('http://sakapi.microdataindonesia.co.id/wilayah/kecamatan/' + e.target.value)
        .then(response => {   
            console.log(response.data)
            this.setState({  
                KecamatanData: response.data  
            });  
        })
        .catch(error => {
            console.warn(error);
        });  
    }  

    ChangeKelurahan = (e) => {  
        this.setState({ KecamatanId: e.target.value });  
        axios.get('http://sakapi.microdataindonesia.co.id/wilayah/kelurahan/' + e.target.value)
        .then(response => {  
            console.log(response.data)
            this.setState({  
                KelurahanData: response.data  
            });  
        })
        .catch(error => {
            console.warn(error);
        }); 
    }  

    setNamaPemohon (p) {
        this.setState({NamaPemohon: p})
    }

    setStartDate (p) {
        this.setState({startDate: p})
    }

    // dengan menggunakan hook react js
    setEndDate (p) {
        this.setState({endDate: p})
    }

    render() {
        return (
            <div className="body">
            <div className="card">
                <div className="container">
                    <form>
                        <div className="form-row">
                            <div className="form-group col-md-3">
                                <label>Tanggal Mulai</label>
                                <DatePicker
                                    className="form-control tm"
                                    dateFormat="yyyy-MM-dd"
                                    selected={this.state.startDate}
                                    onChange={this.setStartDate}
                                    placeholderText="yyyy-mm-dd"
                                />
                            </div>
                            <div className="form-group col-md-3">
                                <label>Tanggal Akhir</label>
                                <DatePicker
                                    className="form-control ta"
                                    dateFormat="yyyy-MM-dd"
                                    selected={this.state.endDate}
                                    onChange={this.setEndDate}
                                    placeholderText="yyyy-mm-dd"
                                />
                            </div>

                            <div className="form-group col-md-3">
                                <label>Provinsi</label>
                                <select className="form-control" name="provinsi" value={this.state.ProvinsiId} onChange={this.ChangeKabupaten}>  
                                    <option>Pilih Provinsi</option>  
                                    {this.state.ProvinsiData.map((e, key) => {  
                                        return <option key={key} value={e.id}>{e.instansi}</option>;  
                                    })}  
                                </select> 
                            </div>
                            <div className="form-group col-md-3">
                                <label>Kabupaten</label>
                                <select className="form-control slkb" name="kabupaten" value={this.state.KabupatenId} disabled={!this.state.ProvinsiId} onChange={this.ChangeKecamatan}>  
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
                                <input type="text" className="form-control" value={this.state.NamaPemohon} onChange={this.setNamaPemohon}/>
                            </div>
                            <div className="form-group col-md-3">
                                <label>Kecamatan</label>
                                <select className="form-control slkc" name="kecamatan" value={this.state.KecamatanId} disabled={!this.state.KabupatenId} onChange={this.ChangeKelurahan}>  
                                    <option>Pilih Kecamatan</option>    
                                        {this.state.KecamatanData.map((e, key) => {  
                                            return <option key={key} value={e.id}>{e.instansi}</option>;  
                                        })}  
                                </select>
                            </div>
                            <div className="form-group col-md-3">
                                <label>Kelurahan</label>
                                <select className="form-control slkl" name="kelurahan" value={this.state.KelurahanId} disabled={!this.state.KecamatanId}>  
                                    <option>Pilih Kelurahan</option>    
                                        {this.state.KelurahanData.map((e, key) => {  
                                            return <option key={key} value={e.id}>{e.instansi}</option>;  
                                        })}  
                                </select>
                            </div>
                        </div>

                        <button className="btn btn-primary btn-sm float-right">Cari</button>
                    </form>
                </div>
            </div>  
        </div>
        )
    }
}

function mapStateToProps(state) {
    return {datapencarian: state.datapencarian}
}

export default connect(mapStateToProps)(Search);