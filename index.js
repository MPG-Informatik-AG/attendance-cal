const express = require("express")
const body_parser = require("body-parser")
const sha = require("js-sha512")
const app = express()
const db_handler = require("./db_handler")

app.use(body_parser.json({limit: "50mb"}))
app.use("/", express.static("client"))

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

app.post("/new/person", (req, res) => {
   if (!check_hash(req.body.loginhash)) {
      return res.status(401).send("wrong login hash")
   }

   db_handler.createPersonInDB(req.body.name).then(r => {
      res.send(r)
   }).catch(err => {
      res.status(500).send(err)
   })
})

app.post("/get/persons", (req, res) => {
   if (!check_hash(req.body.loginhash)) {
      return res.status(401).send("wrong login hash")
   }
   db_handler.getAllPersonsFromDB().then(r => {
      res.send(r)
   }).catch(err => {
      res.status(500).send(err)
   })
})

app.post("/delete/person", (req, res) => {
   if (!check_hash(req.body.loginhash)) {
      return res.status(401).send("wrong login hash")
   }
   db_handler.deletePersonInDB(req.body.id).then(r => {
      res.send(r)
   }).catch(err => {
      res.status(500).send(err)
   })
})

app.post("/get/appmnts", (req, res) => {
   if (!check_hash(req.body.loginhash)) {
      return res.status(401).send("wrong login hash")
   }
   db_handler.getAllAppmntsFromDB().then(r => {
      res.send(r)
   }).catch(err => {
      res.status(500).send(err)
   })
})

app.post("/new/appmnt", (req, res) => {
   if (!check_hash(req.body.loginhash)) {
      return res.status(401).send("wrong login hash")
   }

   db_handler.addAppmntToDB(req.body.date, req.body.end_date, req.body.name).then(r => {
      res.send(r)
   }).catch(err => {
      console.error(err)
      res.status(500).send(err)
   })
})

app.post("/delete/appmnt", (req, res) => {
   if (!check_hash(req.body.loginhash)) {
      return res.status(401).send("wrong login hash")
   }
   db_handler.removeAppointmentFromDB(req.body.id).then(r => {
      res.send(r)
   }).catch(err => {
      res.status(500).send(err)
   })
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