const axios = require('axios');
const {response} = require("express");

const data = {
    id: 1
}
axios.get('http://localhost:3000/ban', data)
    .then(response => {
        console.log(response.data.json)
    })
    .catch(error => {
        console.error('Error mendapatkan data: ', error);
    });