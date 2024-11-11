const express = require('express');
const cors = require('cors');
const fs = require('fs');
const bodyParser = require('body-parser');

const app = express();
const port = 4000;

// Use CORS to allow cross-origin requests
app.use(cors());

// Use body-parser middleware to parse URL-encoded and JSON request bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Custom CORS middleware to set additional headers
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, OPTIONS'
  );
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

// Path to the JSON file where movies are stored
const moviesFilePath = './movies.json';

// Initialize the movies.json file with default movies if it doesn't exist
if (!fs.existsSync(moviesFilePath)) {
  const initialMovies = {
    movies: [
      {
        Title: 'Avengers: Infinity War (server)',
        Year: '2018',
        imdbID: 'tt4154756',
        Type: 'movie',
        Poster:
          'https://m.media-amazon.com/images/M/MV5BMjMxNjY2MDU1OV5BMl5BanBnXkFtZTgwNzY1MTUwNTM@._V1_SX300.jpg',
      },
      {
        Title: 'Captain America: Civil War (server)',
        Year: '2016',
        imdbID: 'tt3498820',
        Type: 'movie',
        Poster:
          'https://m.media-amazon.com/images/M/MV5BMjQ0MTgyNjAxMV5BMl5BanBnXkFtZTgwNjUzMDkyODE@._V1_SX300.jpg',
      },
      {
        Title: 'World War Z (server)',
        Year: '2013',
        imdbID: 'tt0816711',
        Type: 'movie',
        Poster:
          'https://m.media-amazon.com/images/M/MV5BNDQ4YzFmNzktMmM5ZC00MDZjLTk1OTktNDE2ODE4YjM2MjJjXkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_SX300.jpg',
      },
    ],
  };
  fs.writeFileSync(moviesFilePath, JSON.stringify(initialMovies, null, 2));
}

// Define the GET /api/movies route
app.get('/api/movies', (req, res) => {
  fs.readFile(moviesFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading movies file:', err);
      res.status(500).send('Internal server error');
      return;
    }

    res.json(JSON.parse(data));
  });
});

// Handle POST request to /api/movies
app.post('/api/movies', (req, res) => {
  const title = req.body.title;
  const year = req.body.year;
  const poster = req.body.poster;

  const newMovie = {
    Title: title,
    Year: year,
    imdbID: `tt${Math.floor(Math.random() * 10000000)}`,
    Type: 'movie',
    Poster: poster,
  };

  // Read existing movies
  fs.readFile(moviesFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading movies file:', err);
      res.status(500).send('Internal server error');
      return;
    }

    const moviesData = JSON.parse(data);
    moviesData.movies.push(newMovie);

    // Write updated movies back to the file
    fs.writeFile(moviesFilePath, JSON.stringify(moviesData, null, 2), (err) => {
      if (err) {
        console.error('Error writing movies file:', err);
        res.status(500).send('Internal server error');
        return;
      }

      // Send a response indicating success
      res
        .status(201)
        .json({ message: 'Movie added successfully', movie: newMovie });
    });
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
