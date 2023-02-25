const mongoose = require('mongoose');

const likeSchema = new mongoose.Schema({
  likeBy: {type: String, required: true },
  likeOn: { type: String, required: true },
});

const Like = mongoose.model('Like', likeSchema);

module.exports = Like;
