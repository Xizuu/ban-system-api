const axios = require('axios');

const url = 'http://localhost:3000/ban/2/delete'; // Ganti dengan URL API Anda dan ID yang sesuai

axios.delete(url)
    .then(response => {
        console.log('Data berhasil dihapus: ', response.data);
    })
    .catch(error => {
        console.error('Error menghapus data: ', error.response ? error.response.data : error.message);
    });
