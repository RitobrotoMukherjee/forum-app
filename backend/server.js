require('dotenv').config();

const express = require('express');

// Invoke App
const app = express();

app.get('/', (req, resp) => {
    resp.send({ message: "Home Page" });
});

// Listen
app.listen(process.env.PORT, () => {
    console.warn('Listenning to port ', process.env.PORT);
});
