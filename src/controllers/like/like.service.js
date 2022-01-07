const Like = require("../../models/Like");
const Post = require("../../models/Post");
const ApiError = require("../../utils/ApiError");
const pick = require("../../utils/pick");
const { isValidId } = require("../../utils/checkId");

const populateOptions = [
  {
    path: "user",
    select: "name avatar",
  },
];

const getLikeById = async (likeId) => {
  const like = await Like.findById(likeId).populate(populateOptions);
  if (!like) {
    throw new ApiError(400, "Like not found");
  }

  return like;
};

const queryLikes = async (query, options) => {
  const paginateOptions = options;
  paginateOptions.populate = populateOptions;

  const likes = await Like.paginate(query, paginateOptions);
  return likes;
};

const createLike = async (postId, user) => {
  if (!isValidId(postId)) {
    throw new ApiError(400, "Post not found");
  }

  // Save new like
  const newLike = new Like({
    user: user._id,
    post: postId,
  });
  await newLike.save();

  // Add new like _id to post
  await Post.findByIdAndUpdate(postId, {
    $push: {
      likes: newLike._id,
    },
  });

  // Modify like before returning
  const retLike = newLike.toObject();
  retLike.user = pick(user.toObject(), ["_id", "name", "avatar"]);

  return retLike;
};

const updateLike = async (likeId, updateBody) => {
  const like = await Like.findByIdAndUpdate(likeId, updateBody, {
    new: true,
  });
  return like;
};

const deleteLike = async (likeId, postId) => {
  if (!isValidId(postId)) {
    throw new ApiError(400, "Post not found");
  }

  if (!isValidId(likeId)) {
    throw new ApiError(400, "Like not found");
  }

  await Promise.all([
    Like.findByIdAndRemove(likeId),
    Post.findByIdAndUpdate(postId, {
      $pull: {
        likes: likeId,
      },
    }),
  ]);

  return null;
};

module.exports = {
  getLikeById,
  queryLikes,
  createLike,
  updateLike,
  deleteLike,
};
