const express = require("express")
const body_parser = require("body-parser")
const sha = require("js-sha512")
const app = express()

app.use(body_parser.json({limit: "50mb"}))
app.use("/", express.static("client"))

//// temp db
var persons = [
   {
      name: "tetsname",
      id: 99999
   }
]
var person_id = 0

app.get("/a/b", (req, res) => {
   res.send("du bist bei /a/b")
})

app.post("/login", (req, res) => {
   console.log(req.body)
   if(check_hash(req.body.loginhash)) {
      res.send("ok")
   } else {
      res.status(401).send("login failed")
   }
})

/*
{
   loginhash: "",
   name: "",
}
*/
app.post("/new/person", (req, res) => {
   if (!check_hash(req.body.loginhash)) {
      return res.status(401).send("wrong login hash")
   }
   persons.push({
      name: req.body.name,
      id: person_id
   })
   person_id++
   res.send("ok")
})

app.post("/get/persons", (req, res) => {
   if (!check_hash(req.body.loginhash)) {
      return res.status(401).send("wrong login hash")
   }
   res.send(JSON.stringify(persons))
})

app.listen(6677, () => {
   console.log("[express] server listening")
})

function check_hash(hash) {
   if (sha.sha512(hash) == "2d04221f85f619cd814ecf31bf0ffb3c41969da7497a20105b933eb8b060e0f9a2bfe4f061c9489e87c4959ac945b1fe5306d9622a99b50067d00c84c40900c8") {
      return true
   } else {
      return false
   }
}