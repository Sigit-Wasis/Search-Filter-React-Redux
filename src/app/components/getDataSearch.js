import axios from 'axios';

export function getDataSearch(e) {
    e.preventDefault();
    axios.get(`http://sakapi.microdataindonesia.co.id/surat-izin-usaha-mikro/statistik?from_date=
        ${this.props.dataFilter.tanggal_mulai}&to_date=${this.props.dataFilter.tanggal_akhir}`)
        .then(response => {
            console.log(response.data);
            this.props.dispatch({
                type: 'DATA_PENCARIAN',
                payload: response.data
            });
        });
}
