const mongoose = require("mongoose");
const paginate = require("mongoose-paginate-v2");

const User = require("./User");

const commentSchema = mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: User,
    },
  },
  {
    timestamps: true,
  }
);

const postSchema = mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    user: {
      type: String,
      required: true,
      ref: "User",
    },
    media: {
      type: String,
    },
    comments: {
      type: [commentSchema],
    },
  },
  {
    timestamps: true,
  }
);

// Plugins
postSchema.plugin(paginate);

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
