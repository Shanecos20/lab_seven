const express = require('express'); // Importing the 'express' framework
const path = require('path'); // Importing the 'path' module to handle file paths
const app = express(); // Creating an instance of the express app
const port = 3000; // Setting the port number to 3000

// Default route that responds with a welcome message
app.get('/', (req, res) => {
    res.send('Welcome to data rep and querying!!');
});

// Start the server and listen on the specified port
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

// Error-handling middleware, logs the error and sends a 500 status with a message
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

// Dynamic route that accepts two parameters (name and surname) and responds with a personalized message
app.get('/hello/:name/:surname', (req, res) => {
    const name = req.params.name;          // Extract 'name' from the URL parameters
    const surname = req.params.surname;    // Extract 'surname' from the URL parameters
    res.send(`Hello ${name} ${surname}`);  // Respond with a greeting message
});

// Route that responds with a JSON object of movies data
app.get('/api/movies', (req, res) => {
    const myMovies = [                     // Array containing movie objects
        {
            "Title": "Avengers: Infinity War",
            "Year": "2018",
            "imdbID": "tt4154756",
            "Type": "movie",
            "Poster": "https://example.com/poster1.jpg"
        },
        {
            "Title": "Captain America: Civil War",
            "Year": "2016",
            "imdbID": "tt3498820",
            "Type": "movie",
            "Poster": "https://example.com/poster2.jpg"
        },
        {
            "Title": "World War Z",
            "Year": "2013",
            "imdbID": "tt0816711",
            "Type": "movie",
            "Poster": "https://example.com/poster3.jpg"
        }
    ];

    // Responding with the movie data in JSON format and setting status to 201 (Created)
    res.status(201).json({ myMovies });
});

// Route to serve the index.html file
app.get('/index', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));  // Sends the 'index.html' file using an absolute path
});

// Middleware to serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));  // Static files (e.g., CSS, images) served from the 'public' folder

// Route that accepts query parameters for the first and last name and responds with a hello fname lname
app.get('/name', (req, res) => {
    const firstname = req.query.firstname;   // Extract 'firstname' from the query string
    const lastname = req.query.lastname;     // Extract 'lastname' from the query string
    res.send(`Hello ${firstname} ${lastname}`);
});

// Importing body parser to parse form data
const bodyParser = require('body-parser');

// Middleware to parse URL-encoded form data 
app.use(bodyParser.urlencoded({ extended: true }));

// Route that handles POST requests for the /name endpoint, extracting form data and sends back fname lname message
app.post('/name', (req, res) => {
    const firstname = req.body.firstname;  // Extract 'firstname' from the form body
    const lastname = req.body.lastname;    // Extract 'lastname' from the form body
    res.send(`Hello ${firstname} ${lastname}`);
});
