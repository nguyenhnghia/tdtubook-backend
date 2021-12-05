const mongoose = require("mongoose");

const User = require("./User");
const { paginate, toJSON } = require("./plugins");

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
    timestamp: true,
  }
);

const postSchema = mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    media: {
      type: String,
    },
    comments: {
      type: [commentSchema],
    },
  },
  {
    timestamp: true,
  }
);

// Plugins
postSchema.plugin(paginate);
postSchema.plugin(toJSON);

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
