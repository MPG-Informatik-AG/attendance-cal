const express = require("express")
const body_parser = require("body-parser")
const app = express()

app.use(body_parser.json({limit: "50mb"}))
app.use("/", express.static("client"))

app.get("/a/b", (req, res) => {
   res.send("du bist bei /a/b")
})

app.post("/postname", (req, res) => {
   console.log(req.body)
   res.send("ok")
})

app.listen(6677, () => {
   console.log("[express] server listening")
})

//some comment