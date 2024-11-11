const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose'); 

const app = express();
const port = 4000;

// Use CORS to allow cross-origin requests from different domains
app.use(cors());

// Middleware to parse URL-encoded and JSON data in request bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Connect to MongoDB database with error handling
mongoose.connect('mongodb+srv://admin:admin@cluster0.2dzjp.mongodb.net/', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Failed to connect to MongoDB", err));

// Define movie schema and model
const movieSchema = new mongoose.Schema({
  title: String,
  year: String,
  poster: String
});

const Movie = mongoose.model('Movie', movieSchema);

// Custom CORS middleware to set response headers for cross-origin requests
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Define the GET /api/movies route to return movie data from the database
app.get('/api/movies', async (req, res) => {
  try {
    const movies = await Movie.find(); // Fixed missing 'await' to properly fetch data
    res.status(200).json({ movies });
  } catch (error) {
    console.error("Failed to fetch movies:", error);
    res.status(500).json({ error: 'Failed to fetch movies' });
  }
});

// Handle POST request to /api/movies route
app.post('/api/movies', async (req, res) => {
  const { title, year, poster } = req.body;
  const newMovie = new Movie({ title, year, poster });
  
  try {
    await newMovie.save(); // Save the new movie object to the database
    console.log(`Title: ${title}, Year: ${year}, Poster: ${poster}`);
    res.status(201).json({ message: 'Movie received successfully' });
  } catch (error) {
    console.error("Failed to save movie:", error);
    res.status(500).json({ error: 'Failed to save movie' });
  }
});

app.get('/api/movie/:id', async (req, res) => {
  const movie = await Movie.findById(req.params.id);
  res.send(movie);
});

// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
