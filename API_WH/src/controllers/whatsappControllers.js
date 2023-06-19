const winston = require('winston')
require('dotenv').config();
const processMessage = require("../shared/processMessage")


const ACCESS_TOKEN = process.env.ACCESS_TOKEN;


const logger = winston.createLogger({
  level: 'info',
  format: winston.format.simple(),
  transports: [
    new winston.transports.File({
      filename: 'logs.log',
      level: 'info',
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf(({ timestamp, level, message }) => {
          return `[${timestamp}] ${level}: ${message}\n`;
        })
      )
    })
  ]
})

/**
 * @author STEVE
 * @function handleVerification
 * @description Función para manejar la verificación de token entrante.
 * @param {Object} req - El objeto Request.
 * @param {Object} res - El objeto Response.
 * @returns {void} - No devuelve ningún valor.
 */
const handleVerification = (req, res) => {
  try{
    const { query } = req;
    const { "hub.verify_token": token, "hub.challenge": challenge } = query;

    if(challenge != null && token != null && token == ACCESS_TOKEN){
        res.send(challenge);
    }else{
        res.status(400).send();
    }

  }catch(e){
      res.status(400).send();
  }
}

/**
 * @author STEVE
 * @function receivedMessage
 * @description Función para manejar los mensajes recibidos.
 * @param {Object} req - El objeto Request.
 * @param {Object} res - El objeto Response.
 * @returns {void} - No devuelve ningún valor.
 */
const receivedMessage = async(req, res) => {
  try {
    let entry = (req.body["entry"])[0];
    let changes = (entry["changes"])[0];
    let value = changes["value"];
    let message = value["messages"][0];
    
    if (typeof message != "undefined") {
      let textMessage = getTextbyType(message);
      let fromNumber = message["from"];

      if (textMessage != null && fromNumber != null) {

        try {
          const result = await processMessage.process(textMessage, fromNumber);
          res.send("EVENT_RECEIVED:" + result);
        } catch (err) {
          console.error(err);
        }
      }
    }

  }
  catch (e) {
    logger.log("error", e.message);
    console.log(e);
    res.send("EVENT_RECEIVED_ERROR");
  }
};

/**
 * @author STEVE
 * @function getTextbyType
 * @description Función para obtener el texto de un mensaje.
 * @param {Object} libMessage - El objeto que representa el mensaje.
 * @returns {string} - Devuelve el texto del mensaje.
 */
const getTextbyType = (libMessage) =>{
  let text;
  switch (libMessage.type) {
    case "text":
      text = libMessage.text.body;
      break;
    case "interactive":
      var libInteractive = libMessage.interactive;
      switch (libInteractive.type) {
        case "button_reply":
          text = libInteractive.button_reply.title;
          break;
        case "list_reply":
          text = libInteractive.list_reply.title;
          break;
        default:
          logger.log("error", "Unknown type");
          break;
      }
      break;
    default:
      logger.log("error", "Unknown type");
      break;
  }
  return text;
}


module.exports = {handleVerification,receivedMessage}