const express = require("express")
const body_parser = require("body-parser")
const sha = require("js-sha512")
const app = express()

app.use(body_parser.json({limit: "50mb"}))
app.use("/", express.static("client"))

app.get("/a/b", (req, res) => {
   res.send("du bist bei /a/b")
})

app.post("/login", (req, res) => {
   console.log(req.body)
   if (sha.sha512(req.body.loginhash) == "2d04221f85f619cd814ecf31bf0ffb3c41969da7497a20105b933eb8b060e0f9a2bfe4f061c9489e87c4959ac945b1fe5306d9622a99b50067d00c84c40900c8") {
      res.send("ok")
   } else {
      res.status(401).send("login failed")
   }
})

app.listen(6677, () => {
   console.log("[express] server listening")
})

//some comment