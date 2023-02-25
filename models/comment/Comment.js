const mongoose = require('mongoose');
const { MBTI, Enneagramm, Zodiac } = require('../../utils/enums');

const commentSchema = new mongoose.Schema({
  commentBy: {type: String, required: true},
  commentOn: { type: String, required: true },
  title: { type: String },
  description: { type: String },
  mbti: { type: String, enum: MBTI },
  enneagram: { type: String, enum: Enneagramm },
  zodiac: { type: String, enum: Zodiac },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});
  
const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;