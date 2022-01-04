const mongoose = require("mongoose");
const paginate = require("mongoose-paginate-v2");

const postSchema = mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    media: {
      type: [String],
    },
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Plugins
postSchema.plugin(paginate);

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
