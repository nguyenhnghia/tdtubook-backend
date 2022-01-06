const User = require("../../models/User");
const ApiError = require("../../utils/ApiError");

const getUserById = async (userId) => {
  const user = await User.findById(userId).populate("categories");
  if (!user) {
    throw new ApiError(400, "User not found");
  }

  return user;
};

const queryUsers = async (query, options) => {
  const paginateOptions = options;
  paginateOptions.populate = "categories";

  const users = await User.paginate(query, options);
  return users;
};

const createUser = async (createBody) => {
  const user = new User(createBody);
  const newUser = await user.save().then((doc) => doc.populate("categories"));
  return newUser;
};

const updateUser = async (userId, updateBody) => {
  const user = await User.findByIdAndUpdate(userId, updateBody, {
    new: true,
  }).populate("categories");
  return user;
};

const deleteUser = async (userId) => {
  await User.findByIdAndRemove(userId);
  return null;
};

module.exports = {
  getUserById,
  queryUsers,
  createUser,
  updateUser,
  deleteUser,
};
