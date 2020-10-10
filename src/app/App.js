import React from 'react';
import './App.css';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import Filter from './components/Filter';

/* =========================================================================================
// Inisialisasi state untuk menyimpan data yang diterima dari luar komponen.
=========================================================================================== */
const initialState = {
    tanggal_mulai: null,
    tanggal_akhir: null,
    id_provinsi: null,
    id_kabupaten: null,
    id_kecamatan: null,
    id_kelurahan: null,
    id_namapemohon: null,
    data_pencarian: []     // hasil dari pencarian data 
}

/* =========================================================================================
    ** REDUCER ** 
    Reducer adalah sebuah function yang bertugas memproses Action dan bikin State baru. 
    Reducer punya dua parameter state & action.
    action.payload menerima data dari action dispatch yang ada pada file Search.js
=========================================================================================== */
function reducer (state = initialState, action) {
    switch(action.type) {
        case 'TANGGAL_MULAI':
            state.tanggal_mulai = action.payload; 
            return state;
        case 'TANGGAL_AKHIR':
            state.tanggal_akhir = action.payload;
            return state;
        case 'ID_PROVINSI':
            state.id_provinsi = action.payload;
            return state;
        case 'ID_KABUPATEN':
            state.id_kabupaten = action.payload;
            return state;
        case 'ID_KECAMATAN':
            state.id_kecamatan = action.payload;
            return state;
        case 'ID_KELURAHAN':
            state.id_kelurahan = action.payload;
            return state;
        case 'ID_NAMAPEMOHON':
            state.id_namapemohon = action.payload;
            return state;
        case 'HASIL_PENCARIAN':
            state.data_pencarian = action.payload;
            return state;
        default:
            return state;
    } 
}

/* =========================================================================================
    ** STORE ** 
    Store adalah objek yang menghubungkan Action & Reducer. Pada intinya, objek ini bertugas:
    Menyimpan State
    Menyediakan API untuk mengakses State
=========================================================================================== */
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