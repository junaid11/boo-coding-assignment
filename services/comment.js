const Comment = require("../models/comment/Comment");
const Like = require("../models/like/Like");
const { filterLookup, sortLookup } = require("../utils/lookups");

const createComment = async (commentData) => {
  if(commentData.title || commentData.description || commentData.mbti || commentData.enneagram || commentData.zodiac) {
    const comment = new Comment(commentData);
    return comment.save();
  } else {
    throw new Error('Empty body');
  }
};

const getComments = async (queryData) => {
  const { sort, filter } = queryData;

  let filterObj = {};
  if (typeof filter === 'string' && filterLookup.hasOwnProperty(filter))
    filterObj = filterLookup[filter];

  let sortObj = {};
  if (sortLookup.hasOwnProperty(sort))
    sortObj = sortLookup[sort];

  const comments = await Comment.find(filterObj).sort(sortObj);

  const commentIds = comments.map(comment => comment._id);

  const likes = await Like.aggregate([
    {
      $match: {
        likeOn: { $in: commentIds.map((id) => id.toString()) },
      },
    },
    {
      $group: {
        _id: '$likeOn',
        count: { $sum: 1 },
      },
    },
  ]);

  // Map over comments and add likeCount property
  const commentsWithLikes = comments.map(comment => {
    const likeCountObj = likes.find(like => like._id.toString() === comment._id.toString());
    const likesCount = likeCountObj ? likeCountObj.count : 0;
    return { ...comment.toObject(), likesCount };
  });

  if(sort === 'best'){
    commentsWithLikes.sort((a, b) => b.likeCount - a.likeCount);
  }

  return commentsWithLikes;
};

module.exports = {
  createComment,
  getComments
}
