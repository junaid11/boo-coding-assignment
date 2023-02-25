const likeService = require('../services/like');

const like = async (req, res) => {
  try {
    const like = await likeService.like(req.body);
    res.status(201).json(like);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


const unlike = async (req, res) => {
  try {
    const unlike = await likeService.unlike(req.body);
    res.status(200).json(unlike);
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = {
    like,
    unlike
}