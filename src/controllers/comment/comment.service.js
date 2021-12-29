const Comment = require("../../models/Comment");
const Post = require("../../models/Post");
const ApiError = require("../../utils/ApiError");
const pick = require("../../utils/pick");
const { isValidId } = require("../../utils/checkId");

const getCommentById = async (commentId) => {
  const comment = await Comment.findById(commentId);
  if (!comment) {
    throw new ApiError(400, "Comment not found");
  }

  return comment;
};

const queryComments = async (query, options) => {
  const comments = await Comment.paginate(query, options);
  return comments;
};

const createComment = async (createBody, postId, user) => {
  if (!isValidId(postId)) {
    throw new ApiError(400, "Post not found");
  }

  // Save new comment
  const newComment = new Comment({
    ...createBody,
    user: user._id,
    post: postId,
  });
  await newComment.save();

  // Add new comment _id to post
  await Post.findByIdAndUpdate(postId, {
    $push: {
      comments: newComment._id,
    },
  });

  // Modify comment before returning
  const retComment = newComment.toObject();
  retComment.user = pick(user.toObject(), ["name"]);

  return retComment;
};

const updateComment = async (commentId, updateBody) => {
  const comment = await Comment.findByIdAndUpdate(commentId, updateBody, {
    new: true,
  });
  return comment;
};

const deleteComment = async (commentId, postId) => {
  if (!isValidId(postId)) {
    throw new ApiError(400, "Post not found");
  }

  if (!isValidId(commentId)) {
    throw new ApiError(400, "Comment not found");
  }

  await Promise.all([
    Comment.findByIdAndRemove(commentId),
    Post.findByIdAndUpdate(postId, {
      $pull: {
        comments: commentId,
      },
    }),
  ]);

  return null;
};

module.exports = {
  getCommentById,
  queryComments,
  createComment,
  updateComment,
  deleteComment,
};
