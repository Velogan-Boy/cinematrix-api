const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

const movieRouter = require('./routes/movieRouter');

app.use('/api/v1/movies', movieRouter);

module.exports = app;
