const express = require("express")
const router = express.Router()
const whatsappController = require("../controllers/whatsappControllers")

router
.get("/",whatsappController.handleVerification)
.post("/",whatsappController.receivedMessage)
module.exports = router