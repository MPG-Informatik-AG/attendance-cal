const express = require("express")
const body_parser = require("body-parser")
const app = express()

app.use(body_parser.json({limit: "50mb"}))
app.use("/", express.static("client"))

app.get("/a/b", (req, res) => {
   res.send("du bist bei /a/b")
})

app.post("/login", (req, res) => {
   console.log(req.body)
   if (req.body.name == "marc" && req.body.password == "pass") {
      res.send("ok")
   } else {
      res.status(401).send("login failed")
   }
})

app.listen(6677, () => {
   console.log("[express] server listening")
})

//some comment