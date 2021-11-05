const mongoose = require('mongoose');

const dotenv = require('dotenv');
dotenv.config({
   path: './config.env',
});

const app = require('./app');

const DB = process.env.DATABASE.replace(
   '<PASSWORD>',
   process.env.DATABASE_PASSWORD
);

mongoose
   .connect(DB, { useNewUrlParser: true, useUnifiedTopology: true })
   .then(() => {
      console.log(`✅ Database connection successful...`);
   });

const port = process.env.PORT || 4000;

const server = app.listen(port, () => {
   console.log(`✅ Server running on port ${port}... `);
});

process.on('unhandledRejection', err => {
   console.log(err.name, err.message);
   console.log('UNHANDLED REJECTION ... APP SHUTTING DOWN ⛔⛔ .....');
   server.close(() => {
      process.exit(1);
   });
});

process.on('uncaughtException', err => {
   console.log(err.name, err.message);
   console.log('UNCAUGHT EXCEPTION ... APP SHUTTING DOWN ⛔⛔ .....');
   server.close(() => {
      process.exit(1);
   });
});
