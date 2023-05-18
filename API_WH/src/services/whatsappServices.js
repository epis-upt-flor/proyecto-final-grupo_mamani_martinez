const https = require('https')
require('dotenv').config();

const conversation= require('./conversationService')
const customer = require('./customerService')
const delivery = require('./deliveryService')
const order = require('./orderService')
const payment = require('./paymentService')
const returnp = require('./returnService')
const api = require('./apiService')
/**
 * @author STEVE
 * @description Envía un mensaje de texto mediante la API de Facebook Messenger.
 * @function SendMessageText
 * @param {Object} data - Objeto con los datos del mensaje a enviar.
 * @param {string} data.recipient_id - ID del destinatario del mensaje.
 * @param {string} data.message_text - Texto del mensaje a enviar.
 * @returns {void}
 * @throws {Error} Error si ocurre algún problema al enviar el mensaje.
*/


function sendMessageText(data) {
    const options = {
        host : "graph.facebook.com",
        path : "/v16.0/108584732197107/messages",
        method : "POST",
        body : data,
        headers : {
            "Content-Type" : "application/json",
            Authorization : "Bearer "+process.env.TOKEN,
        }
    }
    const req = https.request(options,res=>{
        res.on("data",d=>{
            process.stdout.write(d)
        })
    })
    req.on("ERROR",error=>{
        console.log("error : "+error)
    })
    req.write(data)
    req.end()
}

module.exports = {
    sendMessageText,
    conversation,
    customer,
    delivery,
    order,
    payment,
    returnp,
    api
};