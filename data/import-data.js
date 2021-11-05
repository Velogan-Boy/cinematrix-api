const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Movie = require('../models/movieModel');

dotenv.config({
   path: './config.env',
});

const DB = process.env.DATABASE.replace(
   '<PASSWORD>',
   process.env.DATABASE_PASSWORD
);

mongoose
   .connect(DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
   })
   .then(() => console.log(' DB CONNECTION SUCCESSFULL!'));

// READ JSON FILE
const movies = JSON.parse(fs.readFileSync(`${__dirname}/data.json`, 'utf-8'));

// IMPORT DATA INTO DB
const importData = async () => {
   try {
      await Movie.create(movies);
      console.log('DATA SUCCESSFULLY LOADED!!');
   } catch (err) {
      console.log(err);
   }
   process.exit();
};

// DELETE ALL DATA FROM A COLLECTION
const deleteData = async () => {
   try {
      await Movie.deleteMany();
      console.log('DATA SUCCESSFULLY DELETED!!');
   } catch (err) {
      console.log(err);
   }
   process.exit();
};

if (process.argv[2] === '--import') importData();
if (process.argv[2] === '--delete') deleteData();
