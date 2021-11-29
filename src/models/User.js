const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { paginate, toJSON } = require("./plugins");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: Number,
      required: true,
    },
    token: {
      type: String,
    },
  },
  {
    timestamp: true,
  }
);

// Plugins
userSchema.plugin(paginate);
userSchema.plugin(toJSON);

userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id }, process.env.JWT_KEY);
  user.token = token;
  await user.save();
  return token;
};

userSchema.statics.findByCredentials = async function (username, password) {
  // Check if username exists
  const user = await this.findOne({ username });
  if (!user) {
    throw new Error("Invalid username");
  }

  // Verify password
  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) {
    throw new Error("Invalid password");
  }

  return user;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
