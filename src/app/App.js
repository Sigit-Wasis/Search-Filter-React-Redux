import React from 'react';
import './App.css';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import Filter from './components/Filter';

// Inisialisasi state
const initialState = {
    totalData: '',
    tanggal_mulai: '2020-10-03',
    tanggal_akhir: '2020-10-03',
    id_provinsi: null,
    id_kabupaten: null,
    id_kecamatan: null,
    id_kelurahan: null,
    id_namapemohon: null
}

// reducer 
function reducer (state = initialState, action) {
    switch(action.type) {
        case 'TOTALDATA':
            return {totalData: state.totalData};
        case 'TANGGAL_MULAI':
            return {tanggal_mulai: action.payload};
        case 'TANGGAL_AKHIR':
            return {tanggal_akhir: action.payload};
        case 'ID_PROVINSI':
            return {id_provinsi: action.payload};
        case 'ID_KABUPATEN':
            return {id_kabupaten: action.payload};
        case 'ID_KECAMATAN':
            return {id_kecamatan: action.payload};
        case 'ID_KELURAHAN':
            return {id_kelurahan: action.payload};
        case 'ID_NAMAPEMOHON':
            return {id_namapemohon: action.payload};
        default:
            return state;
    } 
}

// store
const store = createStore(reducer);

function App() {
    return (
        <div className="App">
            <Provider store={store}>
                <Filter/>
            </Provider>
        </div>
    );
}

export default App;
