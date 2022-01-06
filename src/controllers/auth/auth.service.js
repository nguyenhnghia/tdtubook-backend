const { OAuth2Client } = require("google-auth-library");
const bcrypt = require("bcryptjs");

const User = require("../../models/User");
const ApiError = require("../../utils/ApiError");

const oAuth2Client = new OAuth2Client(process.env.CLIENT_GOOGLE_ID);

const loginWithUsernamePassword = async (loginData) => {
  const { username, password } = loginData;

  if (!username || !password) {
    throw new ApiError(401, "No username or password found");
  }

  const user = await User.findByCredentials(username, password);
  const authToken = await user.generateAuthToken();

  return authToken;
};

const loginWithGoogle = async (tokenId) => {
  const ticket = await oAuth2Client.verifyIdToken({
    idToken: tokenId,
    audience: process.env.CLIENT_GOOGLE_ID,
  });

  const { name, email, picture: avatar } = ticket.getPayload();
  const studentExisted = await User.findOne({ email });

  let authToken;
  if (!studentExisted) {
    const student = new User({
      name,
      email,
      avatar,
      studentId: email.split("@")[0],
      role: "student",
    });
    await student.save();
    authToken = await student.generateAuthToken();
  } else {
    authToken = await studentExisted.generateAuthToken();
  }

  return authToken;
};

const changePassword = async (userId, oldPassword, newPassword) => {
  if (oldPassword === newPassword) {
    throw new ApiError(400, "New password must be different from old password");
  }

  const user = await User.findById(userId);
  if (!user) {
    throw new ApiError(401, "No user found");
  }

  const isPasswordMatch = await bcrypt.compare(oldPassword, user.password);
  if (!isPasswordMatch) {
    throw new ApiError(400, "Old password is not correct");
  }

  Object.assign(user, { password: newPassword, token: "" });
  await user.save();
};

module.exports = {
  loginWithUsernamePassword,
  loginWithGoogle,
  changePassword,
};
