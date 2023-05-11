const express = require("express")
const router = express.Router()
const whatsappController = require("../controllers/whatsappControllers")

/**
 * @author STEVE
 * @function router
 * @description Router para manejar las rutas de la aplicacion.
 *
 * @route GET /
 * @description Manejador de verificacion para recibir los mensajes de WhatsApp.
 * @param {object} req - Solicitud HTTP.
 * @param {object} res - Respuesta HTTP.
 *
 * @route POST /
 * @description Manejador de mensajes recibidos para procesar los mensajes de WhatsApp.
 * @param {object} req - Solicitud HTTP.
 * @param {object} res - Respuesta HTTP.
 *
 * @returns {object} router - Modulo de rutas exportado.
 */

router
.get("/",whatsappController.handleVerification)
.post("/",whatsappController.receivedMessage)
module.exports = router