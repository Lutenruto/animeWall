const mongoose = require('mongoose');

const animeSchema = mongoose.Schema({
  userId: { type: String, required: true },
  title: { type: String, required: true },
  imageUrl: { type: String, required: true },
  description: { type: String, required: true },
});

module.exports = mongoose.model('Anime', animeSchema);