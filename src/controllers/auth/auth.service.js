const User = require("../../models/User");
const ApiError = require("../../utils/ApiError");

const loginWithUsernamePassword = async (loginData) => {
  const { username, password } = loginData;

  if (!username || !password) {
    throw new ApiError(401, "No username or password found");
  }

  const user = await User.findByCredentials(username, password);
  const token = await user.generateAuthToken();

  return token;
};

module.exports = {
  loginWithUsernamePassword,
};
