const express = require('express');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const hotelRouter = require('./routes/hotelRoutes');

const app = express();

app.use(express.json());

app.use((req, res, next) => {
    req.requestTime = new Date().toISOString()
})

// Handler for defined routes
app.use('/api/v1/hotels', hotelRouter);

// Handler for undefined routes
app.all('*', (req, res, next) => {
 next(new AppError(`Can't find ${req.originalUrl} on this server`, 404))
})

// Registers Error handling middleware for entire application
app.use(globalErrorHandler);

module.exports = app;
