// implement your API here

const express = require("express");
let data = require("./data/db.js");

const app = express();

app.use(express.json())

app.get("/", (req, res) => {
    console.log("ip:", req.ip);
    res.json({ message: "Welcome to my first back end task" })
})

app.post("/api/users", (req, res) => {
    const { name, bio } = req.body;
  
    if (!name || !bio) {
      res.status(400).json({ errorMessage: "Please provide name and bio for the user." })
    } else {
      data
        .insert(req.body)
        .then(user => {
          res.status(201).json(user);
          // не показує мені всю інфу - чому тільки ІД? Попробувати добавити в db.js до функції find ще щось крім ІД
          console.log(user)
        })
        .catch(() => {
          res.status(500).json({ errorMessage: "There was an error while saving the user to the database" })
        });
    }
})

app.get("/api/users", (req, res) => {
    data
        .find()
        .then(users => {
            res.status(200).json(users)
        })
        .catch(() => {
            res.status(500).json({ errorMessage: "The users information could not be retrieved." })
        })
})

app.get("/api/users/:id", (req, res) => {
    if(req.params.id){
        data
            .findById(req.params.id)
            .then(user =>{
                res.status(200).json(user)
            })
            .catch(() => {
                res.status(500).json({ errorMessage: "The user information could not be retrieved." })
            })
    }else{
        res.status(404).json({ message: "The user with the specified ID does not exist." })
    }
})

app.delete("/api/users/:id", (req, res) => {
    if(req.params.id){
        data
            .remove(req.params.id)
            .then(user =>{
                res.status(200).json(user)
            })
            .catch(() => {
                res.status(500).json({ errorMessage: "The user could not be removed" })
            })
    }else{
        res.status(404).json({ message: "The user with the specified ID does not exist." })
    }
})

// When the client makes a PUT request to /api/users/:id:

// If the user with the specified id is not found:

// respond with HTTP status code 404 (Not Found).
// return the following JSON object: { message: "The user with the specified ID does not exist." }.
// If the request body is missing the name or bio property:

// respond with HTTP status code 400 (Bad Request).
// return the following JSON response: { errorMessage: "Please provide name and bio for the user." }.
// If there's an error when updating the user:

// respond with HTTP status code 500.
// return the following JSON object: { errorMessage: "The user information could not be modified." }.
// If the user is found and the new information is valid:

// update the user document in the database using the new information sent in the request body.
// respond with HTTP status code 200 (OK).
// return the newly updated user document.

// update(): accepts two arguments, the first is the id of the user to update and the second is an 
// object with the changes to apply. It returns the count of updated records. If the count is 1 it means the record was updated correctly.


app.put("/api/users/:id", (req, res) => {

    const { name, bio } = req.body;

    if(req.params.id){
        if(!name || !bio) {
            res.status(400).json({ errorMessage: "Please provide name and bio for the user." })
        } else {
            data
                .update(req.params.id, req.body)
                .then(user =>{
                    res.status(200).json(user)
                })
                .catch(() => {
                    res.status(500).json({ errorMessage: "The user information could not be modified." })
                })
        }
    }else{
        res.status(404).json({ message: "The user with the specified ID does not exist." })
    }
})


const port = 1204
const host = "127.0.0.1" 

app.listen(port, host, () => {
    console.log(`Server running at http://${host}:${port}`)
})

