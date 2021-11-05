const Movie = require('../models/movieModel');

exports.getAllMovies = async (req, res) => {
   try {
      const movies = await Movie.find().select('-__v');

      res.status(200).json({
         status: 'success',
         result: movies.length,
         data: movies,
      });
   } catch (err) {
      res.status(400).json({
         status: 'fail',
         err: err.errmsg,
      });
   }
};

exports.getMovieByID = async (req, res) => {
   try {
      const movie = await Movie.findById(req.params.id).select('-__v');

      res.status(200).json({
         status: 'success',
         data: movie,
      });
   } catch (err) {
      res.status(400).json({
         status: 'fail',
         err: err.errmsg,
      });
   }
};
