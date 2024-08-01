// Express import
const express = require("express");
// File system module import
const fs = require("fs");
// Path import
const path = require("path");
// Helper method for generating unique ids
const uniqid = require("uniqid");

// Port
const PORT = process.env.PORT || 3001;

// Creates new app with express
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("HW 11 Copy/Develop/public"));

// Get route which sends back the index.html page
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "HW 11 COPY/Develop/public/index.html"))
});

// Get route which sends back the notes.html page
app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "HW 11 COPY/Develop/public/notes.html"))
});

// Get route which reads the db.json file and sends back the parsed json data

// Reads the newly added notes from the request body and then adds them to the db.json file

//      Writes data to db.json

//Post route receives a new note, saves it to the request body, adds it to the db.json files, and then returns the new note to the client

// Delete route reads the db.json file, uses the json objects uniqids to match the objectto be deleted, removes that object from the db.json file, then re-writes the db.json file

// App.listen is used to spin up our local server
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);

