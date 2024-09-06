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

app.use(express.static("public"));

// Get route which sends back the index.html page
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public/index.html"))
});

// Get route which sends back the notes.html page
app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "public/notes.html"))
});

// Get route which reads the db.json file and sends back the parsed json data
app.get("/api/notes", function(req, res){
  fs.readFile("db/db.json", "utf8", (err, data) => {
    var jsonData = JSON.parse(data);
    console.log(jsonData);
    res.json(jsonData);
  })
});
// Reads the newly added notes from the request body and then adds them to the db.json file
const writeToJson = (destination, content) => {
  fs.writeFile(destination, JSON.stringify(content, null, 4), (err) => {
      err ? console.error(err) : console.info(`Data written to ${destination}`);
  })
}

app.post("/api/notes", function(req, res){
  const {title, text} = req.body
  if (title && text) {
    const newNote = {
      title: title,
      text: text,
      id: uniqid()
    }
    fs.readFile("db/db.json", "utf8", (err,data) => {
      if(err){
        console.log(err)
      } else {
        const parsedData = JSON.parse(data);
        parsedData.push(newNote);
        writeToJson("db/db.json", parsedData);
      }
    }
    )
    const response = {
      status: "success",
      body: newNote,
    };
    res.json(response);
  } else {
    res.json("Error in note")
  }
});
//      Writes data to db.json

//Post route receives a new note, saves it to the request body, adds it to the db.json files, and then returns the new note to the client

// Delete route reads the db.json file, uses the json objects uniqids to match the objectto be deleted, removes that object from the db.json file, then re-writes the db.json file
app.delete("/api/notes/:id", (req, res) => {
  let id = req.params.id;
  let parsedData; 
  fs.readFile("db/db.json", "utf8", (err, data) => {
    if (err){
      console.log(err)
    } else {
      parsedData = JSON.parse(data);
      const filterData = parsedData.filter((note) => note.id !== id);
      writeToJson("db/db.json", filterData);
    }
  })
  res.send(`Deleted note with ID ${id}`)
});
// App.listen is used to spin up our local server
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);

