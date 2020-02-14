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
        .catch(err => res.status(500).json({errorMessage: "There was an error while saving the user to the database"}))

   } else {
       res.status(400).json({ errorMessage: "Please provide name and bio for user" })
   }
   

})

server.get("/api/users", (req, res) => {

    db.find()
        .then(u => res.json(u))
        .catch(err => res.status(500).json({errorMessage: "The users information could not be retrieved."}))
})

server.get("/api/users/:id", (req, res) => {

    const id = req.params.id
    
    if ( id != undefined ) {
        
        db.findById(id)
            .then(u => res.status(200).json(u))
            .catch(err => res.status(500).json({ errorMessage: "The user information could not be retrieved." }))

    } else {

        res.status(404).json({ message: "The user with the specified ID does not exist." })

    }

})

server.delete("/api/users/:id", (req, res) => {

    const id = req.params.id
    
    if (id) {
        
        db.remove(id)
            .then(u => res.json(u))
            .catch(err => res.status(500).json({ errorMessage: "The user information could not be retrieved." }))

    } else {

        res.status(404).json({ message: "The user with the specified ID does not exist." })

    }

})

server.put("/api/users/:id", (req, res) => {

    const { name, bio } = req.body
    const id = req.params.id

    
    if (id == undefined) {
        
        res.status(404).json({ message: "The user with the specified ID does not exist." })

    } else if (name == '' || bio == '') {

        res.status(400).json({ errorMessage: "Please provide name and bio for the user."})

    } else {

        db.update(id, req.body)
            .then(u => res.status(200).json(u))
            .catch(err => res.status(500).json({ errorMessage: "The user information could not be retrieved." }))
    }

})

server.listen(5000, () => {
    console.log("server started at http://localhost:5000")
})