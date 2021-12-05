const User = require("../../models/User");
const ApiError = require("../../utils/ApiError");

const getUserById = async (userId) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new ApiError(404, "User not found");
  }

  return user;
};

const queryUsers = async (filter, options) => {
  const users = await User.paginate(filter, options);
  return users;
};

const createUser = async (createBody) => {
  const user = new User(createBody);
  await user.save();
  const token = await user.generateAuthToken();
  return { user, token };
};

const updateUser = async (userId, updateBody) => {
  const user = await User.findByIdAndUpdate(userId, updateBody, {
    new: true,
  });
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
