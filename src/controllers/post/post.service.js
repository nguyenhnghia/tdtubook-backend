const Post = require("../../models/Post");
const ApiError = require("../../utils/ApiError");

const populateOptions = {
  path: "user",
  select: "name",
};

const getPostById = async (postId) => {
  const post = await Post.findById(postId).populate(populateOptions);
  if (!post) throw new ApiError(404, "Post not found");
  return post;
};

const queryPosts = async (query, options) => {
  const paginateOptions = options;
  paginateOptions.populate = populateOptions;

  const posts = await Post.paginate(query, paginateOptions);
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
  }).populate(populateOptions);
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
