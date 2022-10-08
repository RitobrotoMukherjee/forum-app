const express = require('express');

// Invoke App
const app = express();

// Listen
app.listen(3030, () => {
    console.warn('Listenning to port 3030');
});
