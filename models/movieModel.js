const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema(
   {
      mid: Number,
      title: String,
      censor: String,
      types: [String],
      genre: [String],
      languages: [String],
      poster: String,
      boxOffice: String,
      runTime: String,
      trailerURL: String,
      plot: String,
      castCrew: [String],
      rating: Number,
      releaseDate: Date,
   },
   {
      toJSON: { virtuals: true },
      toObject: { virtuals: true },
   }
);

movieSchema.virtual('status').get(function () {
   if (this.releaseDate > Date.now()) {
      if ((this.releaseDate - Date.now()) / (1000 * 60 * 24) < 10) {
         return 'nextWeek';
      } else {
         return 'comingSoon';
      }
   } else {
      return 'nowShowing';
   }
});

const Movie = mongoose.model('Movies', movieSchema);

module.exports = Movie;
