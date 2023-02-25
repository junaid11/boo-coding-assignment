const commentService = require('../services/comment');

const createComment = async (req, res) => {
  try {
    const comment = await commentService.createComment(req.body);
    res.status(201).json(comment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


const getComments = async (req, res) => {
  try {
    const comments = await commentService.getComments(req.query);
    res.status(200).json(comments);
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = {
  createComment,
  getComments
}