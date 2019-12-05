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
                res.status(201).json(user)
            })
            .catch(() => {
                res.status(500).json({ errorMessage: "The user information could not be retrieved." })
            })
    }else{
        res.status(404).json({ message: "The user with the specified ID does not exist." })
    }
})


// app.delete("/users/:id", (req, res) => {
//     const user = db.find(row => row.id === req.params.id)

//     if (user){
//         db = db.filter(row => row.id !== req.params.id)
//         res.json(user)
//     }else{
//         res.status(404).json({ error: "User not found" })
//     }
// })



const port = 1204
const host = "127.0.0.1" 

app.listen(port, host, () => {
    console.log(`Server running at http://${host}:${port}`)
})

