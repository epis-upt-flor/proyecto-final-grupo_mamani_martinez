const winston = require('winston')
const fs = require('fs')
const processMessage = require("../shared/processMessage")

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



const ACCESS_TOKEN = "vFgAqJlRmSjOwPzXnEiKcYbHtUyDx";

function validateToken(token) {
    return token === ACCESS_TOKEN;
}

function handleVerification(req, res) {
  try{
    const { query } = req;
    const { "hub.verify_token": token, "hub.challenge": challenge } = query;

    if (!token || !challenge) {
        return res.status(400).send();
    }

    if (validateToken(token)) {
        return res.send(challenge);
    }
  }
  catch(e){
    return res.status(401).send();
  }
}

const receivedMessage = (req, res) => {
  try {
    let entry = (req.body["entry"])[0];
    let changes = (entry["changes"])[0];
    let value = changes["value"];
    let message = value["messages"][0];

    if (typeof message != "undefined") {
      let textMessage = getTextbyType(message);
      let fromNumber = message["from"];
      let id = message["id"];

      if (textMessage != null && fromNumber != null) {
          processMessage.process(textMessage, fromNumber);

        // Aquí es donde se puede guardar la conversación en una base de datos en lugar de escribirla en un archivo
        

        try {
          // Aquí es donde se puede hacer una llamada a la base de datos para guardar la conversación
        } catch (err) {
          console.error(err);
        }
      }
    }
    res.send("EVENT_RECEIVED");
  } catch (e) {
    logger.log("error", e.message);
    console.log(e);
    res.send("EVENT_RECEIVED");
  }
};

function getTextbyType(libMessage) {
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