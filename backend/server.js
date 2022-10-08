require('dotenv').config();

const express = require('express');
const { Logger, NotFound } = require('./middlewares/global_middlewares');
const ROUTES = require('./routes/route');

// Invoke App
const app = express();

// To get post and patch request body as json
app.use(express.json());
// To log request data
app.use(Logger);

// Routes set up
app.use('/api/v1/list', ROUTES);

// 404 Error handlling
app.use(NotFound);

// Listen
app.listen(process.env.PORT, () => {
    console.warn('Listenning to port ', process.env.PORT);
});
