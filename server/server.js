const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send('wompy wompy womp');
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});