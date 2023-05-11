const express = require("express")
const apiRoute = require("./routes/routes")
const connectBD = require("./config/database")
const cv = require("./services/conversationService")
const app = express()

const PORT = process.env.PORT || 3000

app.use(express.json())

connectBD.connect()

app.post("/conversation", async (req, res) => {
  try {
    const conversationData = req.body;
    const savedConversation = await cv.createConversation(conversationData);
    res.json(savedConversation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.use("/webhook", apiRoute)

app.listen(PORT, () => {
  console.log("El puerto es : " + PORT)
})
