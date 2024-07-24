const axios = require('axios');

const url = 'http://localhost:3000/ban'; // Ganti dengan URL API Anda jika berbeda
const data = {
    player: 'Player 1',
    staff: 'Staff Awesome',
    reason: 'Cheat'
};

axios.post(url, data)
    .then(response => {
        console.log('Data berhasil dikirim: ', response.data);
    })
    .catch(error => {
        console.error('Error mengirim data: ', error);
    });