const Post = require("../../models/Post");
const ApiError = require("../../utils/ApiError");

const getPostById = async (postId) => {
  const post = await Post.findById(postId);
  if (!post) {
    throw new ApiError(404, "Post not found");
  }

  return post;
};

const queryPosts = async (filter, options) => {
  const posts = await Post.paginate(filter, options);
  return posts;
};

const createPost = async (createBody) => {
  const post = new Post(createBody);
  await post.save();
  return post;
};

const updatePost = async (postId, updateBody) => {
  const post = await Post.findByIdAndUpdate(postId, updateBody, {
    new: true,
  });
  return post;
};

const deletePost = async (postId) => {
  await Post.findByIdAndRemove(postId);
  return null;
};

module.exports = {
  getPostById,
  queryPosts,
  createPost,
  updatePost,
  deletePost,
};
