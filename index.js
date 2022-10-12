const express = require("express")
const app = express()

app.use("/", express.static("client"))

app.get("/a/b", (req, res) => {
   res.send("du bist bei /a/b")
})

app.post("/postname", (req, res) => {
   console.log(req.body)
   res.send(req.body)
})

app.listen(6677, () => {
   console.log("[express] server listening")
})