const User = require("../models/User");
const logger = require("../config/logger");

const loginWithUsernamePassword = async (loginData) => {
  const { username, password } = loginData;

  if (!username || !password) return null;

  try {
    const user = await User.findByCredentials(username, password);
    const accessToken = await user.generateAuthToken();

    return accessToken;
  } catch (error) {
    logger.error(error);
    return null;
  }
};

const register = async (registerData) => {
  try {
    const user = new User(registerData);
    await user.save();
    const accessToken = await user.generateAuthToken();

    return { user, accessToken };
  } catch (error) {
    logger.error(error);
    return null;
  }
};

module.exports = {
  loginWithUsernamePassword,
  register,
};
