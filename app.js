const express = require('express');
const hotelRouter = require('./routes/hotelRoutes');

const app = express();

app.use(express.json());

app.use('/api/v1/hotels', hotelRouter);

module.exports = app;
