// Setup empty JS object to act as endpoint for all routes
projectData = {};
//setting an array inside the project object to receive data from user and api continuously
projectData.weatherData = [];
// Require Express to run server and routes
const express = require("express");
// Start up an instance of app
const app = express();
//requiring cross-origin resource sharing (cors)
const cors = require("cors");

const port = 8080;
/* Middleware*/

//Here we are configuring express to use body-parser as middle-ware.
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Cors for cross origin allowance
app.use(cors());

// Initialize the main project folder
app.use(express.static("website"));

// Setup Server
const server = app.listen(port, () =>
  console.log(`the sever is running on port ${port}`)
);

//seting a post route

app.post("/input", (req, res) => {
  let newEntry = req.body;
  projectData.weatherData.push(newEntry);
  console.log(newEntry);
  res.end();
});

//setting a get route
app.get("/displaydata", (req, res) => {
  let display = projectData.weatherData[projectData.weatherData.length - 1];
  res.send(display);
});
