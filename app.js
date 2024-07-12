const express = require('express');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp')

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const hotelRouter = require('./routes/hotelRoutes');
const userRouter = require('./routes/userRoutes');
const roomRouter = require('./routes/roomRoutes');
const reviewRouter = require('./routes/reviewRoutes');
const bookingRouter = require('./routes/bookingRoutes');

const app = express();

// GLOBAL MIDDLEWARES

// Use Helmet to set various HTTP headers to protect against common vulnerabilities
app.use(helmet());

// Sets rate limiting using rateLimit() which creates a middleware function we can use using app.use to prevent DDOS and brute force attacks by limiting the number of requests to the /api endpoint by an IP address
const limiter = rateLimit({
  max: 20,
  windowMs: 60 * 60 * 1000,
  message: 'Too many request from this IP, please try again in an hour!',
});

app.use('/api', limiter);

// Parse incoming JSON requests and limit the payload size to 10kb DDoS attacks and improve performance
app.use(express.json({ limit: '10kb' }));

// Santize user input to prevent MongoDB operator injection
app.use(mongoSanitize());

// Clean user input to protect against cross-site scripting (XSS) attacks
app.use(xss());

// Prevent http parameter pollution and whitelist specific parameters
app.use(hpp({
  whitelist: [
    'city',
    'starRating',
    'room_type',
    'availability',
    'sort',
    'fields',
  ]
}));

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// Handler for defined routes
app.use('/api/v1/hotels', hotelRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/rooms', roomRouter);
app.use('/api/v1/reviews', reviewRouter);
app.use('/api/v1/bookings', bookingRouter);

// Handler for undefined routes
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

// Registers Error handling middleware for entire application
app.use(globalErrorHandler);

module.exports = app;
