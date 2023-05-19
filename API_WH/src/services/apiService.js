const axios = require('axios')
require('dotenv').config()


async function sendRequestConsult(message) {
    let data = {
        data: message,
    }
    let config = {
        headers: {
            'Token': process.env.API_KEY
        }
    }
    try {
        let response = await axios.post('http://127.0.0.1:5000/predict/question', data, config)
        try{
            const textFormat = response.data.replace("{","[").replace("}","]").replaceAll("'",'"')
            const textJSON = JSON.parse(textFormat);
            console.log(textJSON[0])
            return textJSON[0]
        }
        catch(e){
            console.log("Text Format Error")
        }
    } catch (error) {
        console.error(`Connection ERROR(MONGO): ${error}`)
    }
}

module.exports = {sendRequestConsult}