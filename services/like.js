const Like = require("../models/like/Like");

const like = async (userData) => {
  const newLike = new Like(userData);
  return newLike.save();
};

const unlike = async (userData) => {
  const { likeBy, likeOn } = userData;
  await Like.findOneAndDelete({ likeBy, likeOn });
  return { message: "Unliked successfully" };
};

module.exports = {
  like,
  unlike,
};
