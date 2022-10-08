require('dotenv').config();

const express = require('express');
const Logger = require('./middlewares/logger');

// Invoke App
const app = express();

// Global Middleware
app.use(Logger);

app.get('/', (req, resp) => {
    resp.send({ message: "Home Page" });
});

// Listen
app.listen(process.env.PORT, () => {
    console.warn('Listenning to port ', process.env.PORT);
});
