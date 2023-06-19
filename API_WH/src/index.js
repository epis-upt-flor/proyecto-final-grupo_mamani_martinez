const express = require("express")
const apiRoute = require("./routes/routes")
const cors = require("cors");
const connectBD = require("./config/database")
const app = express()

const PORT = process.env.PORT || 3000

app.use(express.json())
app.use(cors({
  origin: "http://localhost:62010"
}));

connectBD.connect()

app.use("/webhook", apiRoute)

app.listen(PORT, () => {
  console.log("Puerto de Conexion: " + PORT)
})
