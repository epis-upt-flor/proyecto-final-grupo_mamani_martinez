const https = require('https')

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

function SendMessageText(data) {
    const options = {
        host : "graph.facebook.com",
        path : "/v16.0/108584732197107/messages",
        method : "POST",
        body : data,
        headers : {
            "Content-Type" : "application/json",
            Authorization : "Bearer EAALFJ2ZA604MBAGPMDQqUGTlFYZBoIUAEKwzGuWY8cITvfI0VQSdxAOVTiFZA9wTGUZBQP1OluQxa0wj6MDuBucI1Pujc3LTRU5bSRyV9JZCTp8lF0y16wdHGZBGXdc5NWp3ZAnl4R0KK49uO7fGotaDVWLxVR2CBz3ywYoR6Qmw5rTFQv6bsZAr",
        }
    }
    const req = https.request(options,res=>{
        res.on("data",d=>{
            process.stdout.write(d)
        })
    })
    req.on("ERROR",error=>{
        console.log("error")
    })
    req.write(data)
    req.end()
}

module.exports = {SendMessageText}