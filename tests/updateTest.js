const axios = require('axios');

const url = 'http://localhost:3000/ban/2/update'; // Ganti dengan URL API Anda dan ID yang sesuai
const data = {
    player: 'Player 2',
    staff: 'Owner',
    reason: 'Hacking'
};

axios.put(url, data)
    .then(response => {
        console.log('Data berhasil diperbarui: ', response.data);
    })
    .catch(error => {
        console.error('Error memperbarui data: ', error.response ? error.response.data : error.message);
    });
