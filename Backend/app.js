const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const cors = require('cors');
const app = express();
const cookieParser = require('cookie-parser');
const ConnectToDb = require('./db/db');
const userRoutes = require('./routes/user.route.js');
const captainRoutes = require('./routes/captain.route.js');

ConnectToDb();

// CORS configuration to allow credentials and specific origin
const corsOptions = {
    origin: 'http://localhost:5173', // Your frontend URL
    credentials: true, // This allows cookies to be sent
    optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));  // Apply CORS configuration
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req, res) => {
    res.send('Hello world');
});

app.use('/users', userRoutes);
app.use('/captains', captainRoutes);

module.exports = app;
