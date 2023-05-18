const axios = require('axios')
require('dotenv').config();


async function sendRequestConsult() {
    let data = {
        data: 'Mensaje',
    };
    
    let config = {
        headers: {
            'Token': process.env.API_KEY
        }
    };
    try {
        let response = await axios.post('http://localhost/predict', data, config);
        console.log(response.data);
    } catch (error) {
        console.error(`Hubo un error al hacer la solicitud: ${error}`);
    }
}

module.exports = {sendRequestConsult};