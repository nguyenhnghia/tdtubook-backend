const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const paginate = require("mongoose-paginate-v2");

const ApiError = require("../utils/ApiError");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
    },
    categories: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
      },
    ],
    avatar: {
      type: String,
      default: "http://dvdn247.net/wp-content/uploads/2020/07/avatar-mac-dinh-1.png",
    },
    email: {
      type: String,
    },
    studentId: {
      type: String,
    },
    studentFaculty: {
      type: String,
    },
    studentClass: {
      type: String,
    },
    role: {
      type: String,
      required: true,
    },
    token: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// Plugins
userSchema.plugin(paginate);

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
    throw new ApiError(401, "Invalid username");
  }

  // Verify password
  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) {
    throw new ApiError(401, "Invalid password");
  }

  return user;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
