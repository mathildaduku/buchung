const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app');

// listen for uncaughtException events from synchronous code errors
process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION! SHUTTING DOWN.....')
  console.log(err.name, err.message);
  process.exit(1)
})

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);

// connect to database
mongoose.connect(DB, {}).then(() => console.log('DB connection successful!'));

// start app server
const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

// listen for unhandledRejection events from asybchronous code errors
process.on('unhandledRejection', (err) => {
  console.log(err.name, err.message);
  console.log('UNHANDLED REJECTION! SHUTTING DOWN...')

  server.close(() => {
    process.exit(1);
  });
})