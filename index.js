// implement your API here
const express = require("express")

const db = require("./data/db")

const server = express()

server.use(express.json())

server.post("/api/users", (req, res) => {

   const newUser = {
    name: "Jane Doe",
    bio: "Not Tarzan's Wife, another Jane",  
    created_at: Date.now(),
    updated_at: Date.now(),
   }

   if( newUser.name && newUser.bio) {

       db.insert(newUser)
        .then(u => res.status(201).json(u))
        .catch(err => res.status(404).json({error: `${err}`}))

   } else {
       res.status(400).json({ errorMessage: "Please provide name and bio for user" })
   }
   

})

server.listen(5000, () => {
    console.log("server started at http://localhost:5000")
})