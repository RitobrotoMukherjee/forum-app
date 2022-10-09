require('dotenv').config();

const APP = require('./server');
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        // Listen
        APP.listen(process.env.PORT, () => {
            console.warn('Connected to DB & Listenning to port ', process.env.PORT);
        });
    }).catch(err => console.warn(err));
