const Post = require("../../models/Post");
const Comment = require("../../models/Comment");
const ApiError = require("../../utils/ApiError");
const pick = require("../../utils/pick");

const populateOptions = [
  {
    path: "user",
    select: "name avatar role",
  },
  {
    path: "comments",
    populate: {
      path: "user",
      select: "name avatar",
    },
  },
  {
    path: "likes",
  },
];

const getPostById = async (postId) => {
  const post = await Post.findById(postId).populate(populateOptions);
  if (!post) throw new ApiError(400, "Post not found");
  return post;
};

const queryPosts = async (query, options) => {
  const paginateOptions = options;
  paginateOptions.populate = populateOptions;
  paginateOptions.sort = "-createdAt";

  const posts = await Post.paginate(query, paginateOptions);
  return posts;
};

const createPost = async (createBody, user) => {
  const newPost = new Post({
    ...createBody,
    user: user._id,
  });
  await newPost.save();

  // Modify post before returning
  const retPost = newPost.toObject();
  retPost.user = pick(user.toObject(), ["name", "avatar"]);

  return retPost;
};

const updatePost = async (postId, updateBody) => {
  const post = await Post.findByIdAndUpdate(postId, updateBody, {
    new: true,
  }).populate(populateOptions);
  return post;
};

const deletePost = async (postId) => {
  await Promise.all([
    Post.findByIdAndRemove(postId),
    Comment.deleteMany({
      post: postId,
    }),
  ]);
  return null;
};

module.exports = {
  getPostById,
  queryPosts,
  createPost,
  updatePost,
  deletePost,
};
