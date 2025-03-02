const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectToDb = require('./db/db');
const userRoutes = require('./routes/user.route');
const captainRoutes = require('./routes/captain.route');
const mapsRoutes = require('./routes/maps.route');
const rideRoutes = require('./routes/ride.route');
const authRoutes = require('./routes/auth.route');

connectToDb();

const app = express();

// CORS configuration
const allowedOrigins = [
    'http://localhost:5173',
    process.env.FRONTEND_URL || "https://keshav-riding-creating-application-l04h.onrender.com"
];

const corsOptions = {
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            console.log(`❌ Blocked by CORS: ${origin}`); // Debugging
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true, // Allow cookies and auth headers
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "Authorization"],
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Root endpoint
app.get('/', (req, res) => {
    res.send('Hello World! Server is running.');
});

// API Routes
app.use('/users', userRoutes);
app.use('/captains', captainRoutes);
app.use('/maps', mapsRoutes);
app.use('/rides', rideRoutes);
app.use('/auth', authRoutes);

// Global Error Handling
app.use((err, req, res, next) => {
    console.error(`🚨 Error: ${err.message}`);
    res.status(500).json({ message: 'Something went wrong!', error: err.message });
});

module.exports = app;
