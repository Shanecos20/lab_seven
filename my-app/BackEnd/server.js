// server.js

// Import the required modules
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser'); // Middleware for parsing request bodies

const app = express();
const port = 4000;

// Use CORS to allow cross-origin requests from different domains
app.use(cors());

// Middleware to parse URL-encoded and JSON data in request bodies
app.use(bodyParser.urlencoded({ extended: true })); // Parses URL-encoded data
app.use(bodyParser.json()); // Parses JSON data

const mongoose = require('mongoose');
moongoose.connect('mongodb+srv://admin:admin@cluster0.2dzjp.mongodb.net/');

const movieSchema = new mongoose.Schema({
  title: String,
  year: String,
  poster: String
});

const movieModel = mongoose.model('Movie', movieSchema);

// Custom CORS middleware to set response headers for cross-origin requests
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // Allow requests from any origin
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS" // Specify allowed HTTP methods
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept" // Specify allowed headers
  );
  next(); // Proceed to the next middleware/route handler
});

// Define the GET /api/movies route to return static JSON data
app.get('/api/movies', (req, res) => {
  // Respond with a list of movie objects
  res.json({
    "movies": [
      {
        "Title": "Avengers: Infinity War (server)",
        "Year": "2018",
        "imdbID": "tt4154756",
        "Type": "movie",
        "Poster":
          "https://m.media-amazon.com/images/M/MV5BMjMxNjY2MDU1OV5BMl5BanBnXkFtZTgwNzY1MTUwNTM@._V1_SX300.jpg"
      },
      {
        "Title": "Captain America: Civil War (server)",
        "Year": "2016",
        "imdbID": "tt3498820",
        "Type": "movie",
        "Poster":
          "https://m.media-amazon.com/images/M/MV5BMjQ0MTgyNjAxMV5BMl5BanBnXkFtZTgwNjUzMDkyODE@._V1_SX300.jpg"
      },
      {
        "Title": "World War Z (server)",
        "Year": "2013",
        "imdbID": "tt0816711",
        "Type": "movie",
        "Poster":
          "https://m.media-amazon.com/images/M/MV5BNDQ4YzFmNzktMmM5ZC00MDZjLTk1OTktNDE2ODE4YjM2MjJjXkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_SX300.jpg"
      }
    ]
  });
});

// Handle POST request to /api/movies route
app.post('/api/movies', (req, res) => {
  // Extract movie data from the request body
  const title = req.body.title;
  const year = req.body.year;
  const poster = req.body.poster;

  // Log the received movie data to the console for debugging purposes
  console.log(`Title: ${title}, Year: ${year}, Poster: ${poster}`);

  // Send a response back to the client indicating successful receipt of the data
  res.status(201).json({ message: 'Movie received successfully' });
});

// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});



