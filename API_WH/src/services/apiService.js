const axios = require('axios')
require('dotenv').config()

let config = {
    headers: {
        'Token': process.env.API_KEY
    }
}
async function sendRequestConsult(message) {

    try {
        let response = await axios.post('http://127.0.0.1:5000/predict/question', {
            data: message,
        }, config)
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
async function sendRequestDish(message) {
    try {
        let response = await axios.post('http://127.0.0.1:5000/predict/product', {
            data: message,
        }, config)
        try{
            let data = String(response.data)
            data = data.replace(/None/g, 'null').replace(/False/g, 'false').replace(/True/g, 'true').replaceAll("'",'"');
            let jsonData = JSON.parse(data);
            return jsonData
        }
        catch(e){
            console.log("Text Format Error")
        }
    } catch (error) {
        console.error(`Connection ERROR(MONGO): ${error}`)
    }
}


module.exports = {sendRequestConsult,sendRequestDish}